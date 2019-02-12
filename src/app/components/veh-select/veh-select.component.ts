import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { getRepository, Repository, BaseEntity as Entity } from 'typeorm';

@Component({
  selector: 'veh-select',
  templateUrl: './veh-select.component.html',
  styleUrls: ['./veh-select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,  useExisting: forwardRef(() => VehSelectComponent),  multi: true }
  ]
})
export class VehSelectComponent implements OnInit, ControlValueAccessor {
  
  @Input('entity')
  entityName: string;

  @Input('valueField')
  valueField: string = 'abbreviation';
  
  @Input('displayField')
  displayField: string = 'name';

  @Input()
  placeholder: string = 'Select';

  list: any[];

  _value: any;
  onChange: Function = () => { };
  onTouched: Function = () => { };

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor() { }

  async ngOnInit() {
    if (!this.entityName) {
      // throw error
      return;
    }

    const repository: Repository<Entity> = getRepository(this.entityName);
    if (repository) {
      this.list = await repository.find({cache: true});
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
