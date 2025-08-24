import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HERO_FORM, HERO_FORM_IMPORTS } from './hero-form.component.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { HeroForm } from '@app/modules/heroes/domain/dto/heroes.dto';
import { Router } from '@angular/router';
import { HEROE_ROUTE_NAMES_GLOBAL } from '@app/modules/heroes/heroes.routenames';
import { SnackbarComponent } from '@app/shared/components/atoms/snackbar/snackbar.component';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';

@Component({
  selector: 'app-hero-form',
  imports: [...HERO_FORM_IMPORTS],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.sass'
})
export class HeroFormComponent implements OnChanges {

  @Input() default: HeroForm | null = null;
  @Input() title!: string;
  @Input() isEdit: boolean = false;
	@Output() actionForm = new EventEmitter<HeroForm>();

	private fb = inject(FormBuilder);
	readonly HERO_FORM = HERO_FORM;
  readonly buttonType = ButtonType;
	private router = inject(Router);
  // private snackBar = inject(MatSnackBar);
  private modalService = inject(ModalMessageService);

  formGroup!: FormGroup;
  actions_class = 'flex justify-content-end p-3';

  constructor() {
		this._init();
	}


  ngOnChanges(changes: SimpleChanges): void {
		if (changes['default']) this._getDefault();
	}

  openSnackBar(text: string) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   duration: 2000,
    //   data: { message: text}
    // });
  }

  clickBtnCancel() {
    this.modalService.open(this.isEdit ? MODAL_MESSAGES.modalConfirmEditCancel : MODAL_MESSAGES.modalConfirmSaveCancel, () => {
		  this.router.navigate([`${HEROE_ROUTE_NAMES_GLOBAL.LIST}`]);
    });
	}

	clickBtnSave() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
        this.openSnackBar('Por favor completa los campos requeridos');
        return;
    } else {
      this.modalService.open(this.isEdit ? MODAL_MESSAGES.modalConfirmEdit : MODAL_MESSAGES.modalConfirmSave, () => {        
        this.actionForm.emit(this.formGroup.getRawValue());
      });
    }
	}

  private _init(): void {
    this.formGroup = this.fb.group({
			[HERO_FORM.Name]: ['', [Validators.required]],
			[HERO_FORM.Power]: ['', [Validators.required]],
			[HERO_FORM.Universe]: ['', [Validators.required]],
			[HERO_FORM.Age]: [null, [Validators.required, Validators.min(1) ,Validators.max(99)]],
		});
  }

  private _getDefault() {
		if (this.default && this.formGroup) {
			this.formGroup.patchValue({
        [HERO_FORM.Name]: [this.default.name],
        [HERO_FORM.Power]: [this.default.power],
        [HERO_FORM.Universe]: [this.default.universe],
        [HERO_FORM.Age]: [this.default.age],
			});
		}
	}
}
