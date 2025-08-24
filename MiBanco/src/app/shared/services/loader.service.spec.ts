import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLoaderComponent } from '../components/molecules/modals/modal-loader/modal-loader.component';

describe('LoaderService', () => {
  let service: LoaderService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalLoaderComponent>>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    });

    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog when show() is called and no dialogRef exists', () => {
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.show();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ModalLoaderComponent, {
      disableClose: true,
      width: '250px',
      panelClass: 'loader-dialog'
    });
  });

  it('should not open dialog again if dialogRef already exists', () => {
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.show();
    service.show();

    expect(matDialogSpy.open).toHaveBeenCalledTimes(1);
  });

  it('should close dialog and reset dialogRef when hide() is called', () => {
    matDialogSpy.open.and.returnValue(matDialogRefSpy);

    service.show();
    service.hide();

    expect(matDialogRefSpy.close).toHaveBeenCalled();

    service.hide();
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
  });
});
