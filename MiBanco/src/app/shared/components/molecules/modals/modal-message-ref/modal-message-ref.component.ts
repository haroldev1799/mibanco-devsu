import { Component, inject } from '@angular/core';
import { DataModalMessageRef } from './modal-message-ref.interface';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@app/shared/components/atoms/button/button.component';
import { MODAL_REF_ACTIONS } from '@app/core/enums/modal-ref-actions.enum';

@Component({
	selector: 'app-modal-message-ref',
	imports: [ButtonComponent, NgClass],
	templateUrl: './modal-message-ref.component.html',
	styleUrl: './modal-message-ref.component.sass',
})
export class ModalMessageRefComponent {
	public dataModal: DataModalMessageRef | null = null;
	// public ref = inject(MatDialogRef);
	private router = inject(Router);


	clickBtnAction() {
		if (this.dataModal?.urlRedirect) this.router.navigateByUrl(this.dataModal?.urlRedirect);
		// this.ref?.close({ action: MODAL_REF_ACTIONS.CLICK_ACTION });
	}

	clickBtnSecondary() {
		// this.ref?.close({ action: MODAL_REF_ACTIONS.CLICK_SECONDARY });
	}
}
