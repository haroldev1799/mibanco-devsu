import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { I_InputType } from './input.interface';
import { INPUT_FORM_IMPORTS } from './input.component.constant';
import { getErrorsMessage } from '@app/shared/utils/error-message';

let uniqueId = 0;

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [...INPUT_FORM_IMPORTS],
  	templateUrl: './input.component.html',
	styleUrl: './input.component.sass',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
	@Input() id = '';
	@Input() placeholder = '';
	@Input() label = '';
	@Input() type: I_InputType = 'text';
	@Input() name = '';
	@Input() control: any = new FormControl();
	@Input() maxLength = 50;
	@Input() min?: number | null;
	@Input() max?: number | null;
	@Input() labelAlt = '';
	@Input() autocomplete = 'on';
	@Input() addRequired = false;
	@Input() disabled: boolean = false;
	@Input() uppercase = false;
	@Output() keyEnter = new EventEmitter();

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

	enterInput() {
		this.keyEnter.emit(this.control.value);
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
