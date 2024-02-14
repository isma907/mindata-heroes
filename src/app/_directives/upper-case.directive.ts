import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[mindataUpperCase]',
  standalone: true,
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const text = inputElement.value.toUpperCase();
    inputElement.value = text;
  }
}
