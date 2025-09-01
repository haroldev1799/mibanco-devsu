import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementFormComponent } from './movement-form.component';
import { Router } from '@angular/router';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { of } from 'rxjs';
import { MOVEMENT_FORM } from './movement-form.component.constant';
import { MovementForm } from '@app/modules/movement/domain/dto/movement.dto';

// ==== Mocks =====
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockAccountRepository {
  getAll = jasmine.createSpy().and.returnValue(
    of({ data: [{ id: 1, account_number: '12345' }] })
  );
}

describe('MovementFormComponent', () => {
  let component: MovementFormComponent;
  let fixture: ComponentFixture<MovementFormComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementFormComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AccountRepository, useClass: MockAccountRepository }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementFormComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario y cargar cuentas en _init()', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.accountSelect.length).toBe(1);
    expect(component.accountSelect[0].name).toBe('12345');
  });

  it('debería navegar al hacer clickBtnCancel()', () => {
    component.clickBtnCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movement/list']);
  });

  it('no debería emitir evento si el formulario es inválido en clickBtnSave()', () => {
    spyOn(component.actionForm, 'emit');
    component.clickBtnSave();
    expect(component.actionForm.emit).not.toHaveBeenCalled();
  });

  it('debería emitir evento si el formulario es válido en clickBtnSave()', () => {
    spyOn(component.actionForm, 'emit');

    component.formGroup.setValue({
      [MOVEMENT_FORM.TransactionType]: 'DEBITO',
      [MOVEMENT_FORM.Amount]: 100,
      [MOVEMENT_FORM.AccountId]: 1
    });

    component.clickBtnSave();

    expect(component.actionForm.emit).toHaveBeenCalledWith(component.formGroup.getRawValue());
  });

  it('debería actualizar valores del formulario en ngOnChanges con default', () => {
    const defaultValue: MovementForm = {
      transaction_type: 'CREDITO',
      amount: 200,
      account_id: 1,
      date: '01/01/2001'
    };

    component.default = defaultValue;
    component.ngOnChanges({
      default: {
        currentValue: defaultValue,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.formGroup.value).toEqual({
      [MOVEMENT_FORM.TransactionType]: [defaultValue.transaction_type],
      [MOVEMENT_FORM.Amount]: [defaultValue.amount],
      [MOVEMENT_FORM.AccountId]: [defaultValue.account_id]
    });
  });
});
