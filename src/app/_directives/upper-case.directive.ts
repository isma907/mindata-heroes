import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mindataUpperCase]',
  standalone: true,
})
export class UpperCaseDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const value = this.ngControl.value;
    if (typeof value === 'string') {
      const upperCaseValue = value.toUpperCase();
      this.ngControl.control?.setValue(upperCaseValue, { emitEvent: false });
    }
  }
}
