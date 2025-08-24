import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';
import { ModalMessage } from '@app/core/interfaces/modal-message.interface';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';

@Component({
  selector: 'app-modal-message',
  imports: [ButtonComponent, CommonModule, MatIconModule],
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.sass'
})
export class ModalMessageComponent {

  buttonType = ButtonType;

	constructor(
    private dialogRef: MatDialogRef<ModalMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalMessage
  ) {}

  clickOnHide() {
    this.dialogRef.close('cancel');
  }

  clickBtnAction() {
    this.dialogRef.close('confirm');
  }
}
