import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberRange]',
  standalone: true
})
export class NumberRangeDirective {
  @Input() min?: number;
  @Input() max?: number;

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);

    if (isNaN(value)) {
      this.control.control?.setValue(null);
      return;
    }

    if (this.min !== undefined && value < this.min) {
      value = this.min;
    }
    if (this.max !== undefined && value > this.max) {
      value = this.max;
    }

    this.control.control?.setValue(value);
    input.value = String(value);
  }

}
