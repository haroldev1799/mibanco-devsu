import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountFormComponent } from './account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { ACCOUNT_FORM } from './account-form.component.constant';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockClientRepository: jasmine.SpyObj<ClientRepository>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockClientRepository = jasmine.createSpyObj('ClientRepository', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [AccountFormComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ClientRepository, useValue: mockClientRepository }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores vacíos', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get(ACCOUNT_FORM.account_number)?.value).toBe('');
    expect(component.formGroup.get(ACCOUNT_FORM.status)?.value).toBeTrue();
  });

  it('debería patchear valores cuando se recibe un default', () => {
    const defaultValue = {
      account_number: '12345',
      type: 'SAVINGS',
      initial_balance: 100,
      daily_limit_amount: 500,
      status: false,
      client_id: 1
    };

    component.default = defaultValue;
    component.ngOnChanges({ default: { currentValue: defaultValue, previousValue: null, firstChange: true, isFirstChange: () => true } });
    
    expect(component.formGroup.value).toEqual(defaultValue);
  });

  it('clickBtnCancel debería navegar al listado', () => {
    component.clickBtnCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/list']);
  });

  it('clickBtnSave no debería emitir si el formulario es inválido', () => {
    spyOn(component.actionForm, 'emit');
    component.formGroup.reset(); // inválido
    component.clickBtnSave();
    expect(component.actionForm.emit).not.toHaveBeenCalled();
  });

  it('clickBtnSave debería emitir cuando el formulario es válido', () => {
    spyOn(component.actionForm, 'emit');
    component.formGroup.setValue({
      account_number: '123',
      type: 'SAVINGS',
      initial_balance: 1000,
      daily_limit_amount: 500,
      status: true,
      client_id: 1
    });
    component.clickBtnSave();
    expect(component.actionForm.emit).toHaveBeenCalledWith(component.formGroup.getRawValue());
  });
});
