import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { Router } from '@angular/router';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';
import { MovementForm } from '@app/modules/movement/domain/dto/movement.dto';
import { MOVEMENT_ROUTE_NAMES_GLOBAL } from '@app/modules/movement/movement.routenames';
import { MOVEMENT_FORM, MOVEMENT_FORM_IMPORTS, SELECT_TYPE } from './movement-form.component.constant';
import { SelectComponent } from "@app/shared/components/atoms/select/select.component";
import { IOptionSelect } from '@app/shared/components/atoms/select/select.interface';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';

@Component({
  selector: 'app-movement-form',
  imports: [...MOVEMENT_FORM_IMPORTS, SelectComponent],
  templateUrl: './movement-form.component.html',
  styleUrl: './movement-form.component.sass'
})
export class MovementFormComponent implements OnChanges {

  @Input() default: MovementForm | null = null;
  @Input() title!: string;
  @Input() isEdit: boolean = false;
	@Output() actionForm = new EventEmitter<MovementForm>();

	private fb = inject(FormBuilder);
	private router = inject(Router);
  private accountRepository = inject(AccountRepository);
	readonly MOVEMENT_FORM = MOVEMENT_FORM;
  readonly buttonType = ButtonType;

  formGroup!: FormGroup;
  actions_class = 'flex justify-content-end p-3';
  accountSelect: IOptionSelect[] = [];
  typeTransactionSelect: IOptionSelect[] = SELECT_TYPE;

  constructor() {
		this._init();
	}


  ngOnChanges(changes: SimpleChanges): void {
		if (changes['default']) this._getDefault();
	}


  clickBtnCancel() {
    this.router.navigate([`${MOVEMENT_ROUTE_NAMES_GLOBAL.LIST}`]);
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
			[MOVEMENT_FORM.TransactionType]: ['', [Validators.required]],
			[MOVEMENT_FORM.Amount]: ['', [Validators.required]],
			[MOVEMENT_FORM.AccountId]: [null, [Validators.required]],
		});
    this.accountRepository.getAll().subscribe({
      next: (response) => this.accountSelect = response.data.map( s => ({name : s.account_number, value: s.id.toString()}))
    });
  }

  private _getDefault() {
		if (this.default && this.formGroup) {
			this.formGroup.patchValue({
        [MOVEMENT_FORM.TransactionType]: [this.default.transaction_type],
        [MOVEMENT_FORM.Amount]: [this.default.amount],
        [MOVEMENT_FORM.AccountId]: [this.default.account_id],
			});
		}
	}
}
