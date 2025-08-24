import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorMessage } from '@components/molecules/modals/modal-error/modal-error.interface';
import { DataModalMessage } from '@components/molecules/modals/modal-message-ref/modal-message-ref.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModalErrorService { 
    private dialog = inject(MatDialog);
	dataModal: DataModalMessage | null = null;
    
	setModalMessage<T, R = unknown>(
        modal: ModalErrorMessage,
        component: ComponentType<T>
    ): Observable<R | undefined> {
        if (!modal.status) this.dataModal = null;
        const dialogRef = this.dialog.open<T, ModalErrorMessage['data'], R>(component, {
            data: modal.data,
        });

        return dialogRef.afterClosed();
    }
}
