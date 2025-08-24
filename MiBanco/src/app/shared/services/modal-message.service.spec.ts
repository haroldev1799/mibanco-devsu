import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ModalMessageService } from './modal-message.service';
import { ModalMessageComponent } from '../components/molecules/modals/modal-message/modal-message.component';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';

describe('ModalMessageService', () => {
  let service: ModalMessageService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalMessageComponent>>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ModalMessageService,
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    });

    service = TestBed.inject(ModalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with default data when no arguments are passed', () => {
    matDialogRefSpy.afterClosed.and.returnValue(of('cancel'));
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.open();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ModalMessageComponent, {
      width: '400px',
      disableClose: true,
      data: jasmine.objectContaining(MODAL_MESSAGES.modalDefault)
    });
  });

  it('should call onConfirm callback if dialog result is confirm', () => {
    const onConfirmSpy = jasmine.createSpy('onConfirm');

    matDialogRefSpy.afterClosed.and.returnValue(of('confirm'));
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.open(MODAL_MESSAGES.modalConfirmSave, onConfirmSpy);

    expect(onConfirmSpy).toHaveBeenCalled();
  });

  it('should NOT call onConfirm callback if dialog result is cancel', () => {
    const onConfirmSpy = jasmine.createSpy('onConfirm');

    matDialogRefSpy.afterClosed.and.returnValue(of('cancel'));
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.open(MODAL_MESSAGES.modalConfirmEdit, onConfirmSpy);

    expect(onConfirmSpy).not.toHaveBeenCalled();
  });
});
