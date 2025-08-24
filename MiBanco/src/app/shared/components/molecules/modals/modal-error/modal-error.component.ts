import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataModalMessage } from '../modal-message-ref/modal-message-ref.interface';
import {
	MAT_DIALOG_DATA,
	MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-modal-error',
	 imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatButtonModule,
		MatDialogModule,
	 ],
	templateUrl: './modal-error.component.html',
	styleUrl: './modal-error.component.sass',
})
export class ModalErrorComponent {
	private router = inject(Router);
    private dialog = inject(MatDialog);
	data = inject<DataModalMessage>(MAT_DIALOG_DATA);

	isOpen = false;


	clickBtnAction() {
		if (this.data?.urlRedirect) {
			this.router.navigateByUrl(this.data?.urlRedirect);
		}
	}
}
