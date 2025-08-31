import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AccountForm } from '../../../domain/dto/account.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCOUNT_FORM, ACCOUNT_FORM_IMPORTS, SELECT_TYPE } from './account-form.component.constant';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { Router } from '@angular/router';
import { ACCOUNT_ROUTE_NAMES_GLOBAL } from '@app/modules/account/account.routenames';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { IOptionSelect } from '@app/shared/components/atoms/select/select.interface';


@Component({
  selector: 'app-account-form',
  imports: [...ACCOUNT_FORM_IMPORTS],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.sass'
})
export class AccountFormComponent implements OnChanges {

  @Input() default: AccountForm | null = null;
  @Input() title!: string;
  @Input() isEdit: boolean = false;
	@Output() actionForm = new EventEmitter<AccountForm>();

	private fb = inject(FormBuilder);
	readonly ACCOUNT_FORM = ACCOUNT_FORM;
  readonly buttonType = ButtonType;
	private router = inject(Router);
	private clientRepository = inject(ClientRepository);

  formGroup!: FormGroup;
  actions_class = 'flex justify-content-end p-3';
  options: IOptionSelect[] = [];
  optionsType: IOptionSelect[] = SELECT_TYPE;

  constructor() {
		this._init();
	}

  ngOnChanges(changes: SimpleChanges): void {
		if (changes['default']) this._getDefault();
	}

  clickBtnCancel() {
		this.router.navigate([`${ACCOUNT_ROUTE_NAMES_GLOBAL.LIST}`]);
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
			[ACCOUNT_FORM.account_number]: ['', [Validators.required]],
			[ACCOUNT_FORM.type]: ['', [Validators.required]],
			[ACCOUNT_FORM.initial_balance]: [null, [Validators.required]],
			[ACCOUNT_FORM.daily_limit_amount]: [null, [Validators.required]],
			[ACCOUNT_FORM.status]: [true, [Validators.required]],
			[ACCOUNT_FORM.client_id]: [null, [Validators.required]],
		});
    this.clientRepository.getAll().subscribe({
      next: (response) => this.options = response.data.map( s => ({name : s.name, value: s.id}))
    });
  }

  private _getDefault() {
		if (this.default && this.formGroup) {
			this.formGroup.patchValue({
        [ACCOUNT_FORM.account_number]: this.default?.account_number,
        [ACCOUNT_FORM.type]: this.default?.type,
        [ACCOUNT_FORM.initial_balance]: this.default?.initial_balance,
        [ACCOUNT_FORM.daily_limit_amount]: this.default?.daily_limit_amount,
        [ACCOUNT_FORM.status]: this.default?.status,
        [ACCOUNT_FORM.client_id]: this.default?.client_id,
			});
		}
	}
}
