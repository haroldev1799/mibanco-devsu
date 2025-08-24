import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';
import { ModalMessageComponent } from '../components/molecules/modals/modal-message/modal-message.component';

@Injectable({ providedIn: 'root' })
export class ModalMessageService {
  private dialog = inject(MatDialog);

  open(data = MODAL_MESSAGES.modalDefault, onConfirm?: () => void) {
    const dialogRef = this.dialog.open(ModalMessageComponent, {
      width: '400px',
      disableClose: true,
      data: { ...data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm' && onConfirm) {
        onConfirm();
      }
    });
  }
}
