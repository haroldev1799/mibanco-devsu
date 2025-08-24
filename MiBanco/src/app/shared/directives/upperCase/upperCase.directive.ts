import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInput]',
  standalone: true
})
export class UppercaseDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input')
  onInput(p0: any): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const upper = input.value.toUpperCase();

    // Actualiza el DOM
    input.value = upper;

    // Actualiza el FormControl si existe
    if (this.control && this.control.control) {
      this.control.control.setValue(upper, { emitEvent: false });
    }
  }
}