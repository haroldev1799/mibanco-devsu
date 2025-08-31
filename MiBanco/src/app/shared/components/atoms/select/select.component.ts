import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getErrorsMessage } from '@app/shared/utils/error-message';
import { SELECT_FORM_IMPORTS } from './select.component.constant';
import { IOptionSelect } from './select.interface';

let uniqueId = 0;

@Component({
  selector: 'app-select',
  imports: [...SELECT_FORM_IMPORTS],
  templateUrl: './select.component.html',
  styleUrl: './select.component.sass'
})
export class SelectComponent implements OnInit {
	@Input() id = '';
	@Input() placeholder = '';
	@Input() label = '';
	@Input() name = '';
	@Input() control: any = new FormControl();
	@Input() labelAlt = '';
	@Input() autocomplete = 'on';
	@Input() addRequired = false;
	@Input() disabled: boolean = false;
  @Input() selectId: string = 'select'; // id por defecto
  @Input() options: IOptionSelect[] = []; // opciones
  @Input() selectedValue: string = '';
	@Input() isFullWidth = false;

	inputId = `app-input-${uniqueId++}`;
	labelError: null | string = null;
	errorMessages: Record<string, string> = {};

	constructor(private _cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		if (this.id !== '' && this.id) this.inputId = this.id;

		if (this.control) {
			const label = this.label !== '' ? this.label : this.labelAlt;
			this.errorMessages = getErrorsMessage(label, this.control);
		}

		if (this.disabled) this.control.disable();
		if (this.addRequired) this.control.setValidators([Validators.required]);
	}

	cleanError() {
		this.labelError = null;
		this._cdr.detectChanges();
	}

	get firstErrorMessage(): string | null {
		if (!this.control.touched || !this.control.errors) return null;
		const firstErrorKey = Object.keys(this.control.errors)[0];
		return this.errorMessages[firstErrorKey] ?? null;
	}

	
}
