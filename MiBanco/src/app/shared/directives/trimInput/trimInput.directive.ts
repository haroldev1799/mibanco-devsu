import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[appTrimInput]',
	standalone: true
})
export class TrimInputDirective {
	constructor(
		private el: ElementRef,
		private control: NgControl
	) {}

	@HostListener('blur')
	onBlur(): void {
		const currentValue: string = this.el.nativeElement.value;
		const trimmedValue = currentValue.trim();

		this.el.nativeElement.value = trimmedValue;

		if (this.control && this.control.control) {
			this.control.control.setValue(trimmedValue, { emitEvent: false });
		}
	}
}
