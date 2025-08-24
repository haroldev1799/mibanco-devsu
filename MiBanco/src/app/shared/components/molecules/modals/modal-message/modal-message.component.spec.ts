import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMessageComponent } from './modal-message.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalMessage } from '@app/core/interfaces/modal-message.interface';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ModalMessageComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ModalMessageComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: <ModalMessage>{
            title: 'Prueba',
            message: 'Mensaje de prueba'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close with cancel on clickOnHide', () => {
    component.clickOnHide();
    expect(mockDialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('should close with confirm on clickBtnAction', () => {
    component.clickBtnAction();
    expect(mockDialogRef.close).toHaveBeenCalledWith('confirm');
  });
});
