import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CLIENT_FORM, CLIENT_FORM_IMPORTS } from './client-form.component.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { Router } from '@angular/router';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';
import { Client } from '@app/modules/client/domain/dto/client.dto';

@Component({
  selector: 'app-hero-form',
  imports: [...CLIENT_FORM_IMPORTS],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.sass'
})
export class ClientFormComponent implements OnChanges {

  @Input() default: Client | null = null;
  @Input() title!: string;
  @Input() isEdit: boolean = false;
	@Output() actionForm = new EventEmitter<any>();

	private fb = inject(FormBuilder);
	readonly CLIENT_FORM = CLIENT_FORM;
  readonly buttonType = ButtonType;
	private router = inject(Router);
  private modalService = inject(ModalMessageService);

  formGroup!: FormGroup;
  actions_class = 'flex justify-content-end p-3';

  constructor() {
		this._init();
	}

  ngOnChanges(changes: SimpleChanges): void {
		if (changes['default']) this._getDefault();
	}

  clickBtnCancel() {
		this.router.navigate([`${CLIENT_ROUTE_NAMES_GLOBAL.LIST}`]);
	}

	clickBtnSave() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
        return;
    } else {
      this.actionForm.emit(this.formGroup.getRawValue());
    }
	}

  private _init(): void {
    this.formGroup = this.fb.group({
			[CLIENT_FORM.Name]: ['', [Validators.required]],
			[CLIENT_FORM.Gender]: ['', [Validators.required]],
			[CLIENT_FORM.Age]: ['', [Validators.required, Validators.min(1) ,Validators.max(99)]],
			[CLIENT_FORM.Identification]: [null, [Validators.required]],
			[CLIENT_FORM.Addres]: [null, [Validators.required]],
			[CLIENT_FORM.Phone]: [null, [Validators.required]],
			[CLIENT_FORM.Password]: [null, [Validators.required]],
		});
  }

  private _getDefault() {
		if (this.default && this.formGroup) {
			this.formGroup.patchValue({
        [CLIENT_FORM.Name]: this.default?.name,
        [CLIENT_FORM.Gender]: this.default?.gender,
        [CLIENT_FORM.Age]: this.default?.age,
        [CLIENT_FORM.Identification]: this.default?.identification,
        [CLIENT_FORM.Addres]: this.default?.address,
        [CLIENT_FORM.Phone]: this.default?.phone,
        [CLIENT_FORM.Password]: this.default?.password
		});
		}
	}
}
