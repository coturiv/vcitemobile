import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { getRepository, Repository, BaseEntity } from 'typeorm';

@Component({
  selector: 'veh-select',
  templateUrl: './veh-select.component.html',
  styleUrls: ['./veh-select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,  useExisting: forwardRef(() => VehSelectComponent),  multi: true }
  ]
})
export class VehSelectComponent<T extends BaseEntity> implements OnInit, ControlValueAccessor {

  @Input('entity')
  entityName: string;

  @Input('valueField')
  valueField = 'Abbreviation';

  @Input('displayField')
  displayField = 'Name';

  @Input()
  placeholder = 'Select';

  @Input()
  default: T;

  @Output()
  selectChange = new EventEmitter();

  list: T[];

  _value: T;
  onChange: Function = () => { };
  onTouched: Function = () => { };

  get value() {
    return this._value;
  }

  set value(value: T) {

    if (value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();

      this.selectChange.emit(value);
    }
  }

  constructor() { }

  async ngOnInit() {
    if (!this.entityName) {
      // throw error
      return;
    }

    const repository: Repository<T> = getRepository(this.entityName);
    if (repository) {
      this.list = await repository.find({cache: true}) as T[];
    }

    if (this.default) {
      this.value = this.default[this.valueField];
    }
  }

  getLabel(entity: any) {
    return entity[this.displayField];
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  entityCompare(a: any, b: any) {
    return a.id === b.id;
  }

}
