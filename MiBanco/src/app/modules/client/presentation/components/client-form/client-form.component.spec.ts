import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFormComponent } from './client-form.component';
import { Router } from '@angular/router';
import { CLIENT_FORM } from './client-form.component.constant';
import { Client } from '@app/modules/client/domain/dto/client.dto';

// ==== Mocks =====
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockModalMessageService {}

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormComponent], // standalone
      providers: [
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
    expect(component.formGroup).toBeDefined();
  });

  it('debería navegar a la lista al hacer clickBtnCancel()', () => {
    component.clickBtnCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/client/list']);
  });

  it('no debería emitir evento si el formulario es inválido en clickBtnSave()', () => {
    spyOn(component.actionForm, 'emit');
    component.clickBtnSave();
    expect(component.actionForm.emit).not.toHaveBeenCalled();
  });

  it('debería emitir evento si el formulario es válido en clickBtnSave()', () => {
    spyOn(component.actionForm, 'emit');

    component.formGroup.setValue({
      [CLIENT_FORM.Name]: 'Harold',
      [CLIENT_FORM.Gender]: 'M',
      [CLIENT_FORM.Age]: 28,
      [CLIENT_FORM.Identification]: '12345678',
      [CLIENT_FORM.Addres]: 'Av. Siempre Viva 123',
      [CLIENT_FORM.Phone]: '987654321',
      [CLIENT_FORM.Password]: 'secreto'
    });

    component.clickBtnSave();
    expect(component.actionForm.emit).toHaveBeenCalledWith(component.formGroup.getRawValue());
  });

  it('debería parchar valores al recibir un default en ngOnChanges', () => {
    const defaultValue: Client = {
      id: '1',
      name: 'Ana',
      gender: 'F',
      age: '30',
      identification: '87654321',
      address: 'Calle Falsa 456',
      phone: '912345678',
      password: 'clave123',
      status: true
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
      [CLIENT_FORM.Name]: 'Ana',
      [CLIENT_FORM.Gender]: 'F',
      [CLIENT_FORM.Age]: 30,
      [CLIENT_FORM.Identification]: '87654321',
      [CLIENT_FORM.Addres]: 'Calle Falsa 456',
      [CLIENT_FORM.Phone]: '912345678',
      [CLIENT_FORM.Password]: 'clave123'
    });
  });
});
