import { ElementRef, HostListener, Directive, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class AutoSizeDirective implements AfterViewInit {
  
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.adjust(textArea);
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.adjust();
  }

  adjust(textArea?: HTMLTextAreaElement) {
    textArea = textArea || this.element.nativeElement.querySelector('textarea');
    if (!textArea) {
      return;
    }

    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}