import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientFormComponent } from './client-form.component';
import { CLIENT_FORM } from './client-form.component.constant';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { Client } from '@app/modules/client/domain/dto/client.dto';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let modalSpy: jasmine.SpyObj<ModalMessageService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    modalSpy = jasmine.createSpyObj('ModalMessageService', ['show']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ClientFormComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ModalMessageService, useValue: modalSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component.formGroup).toBeDefined();
  });

  it('should have invalid form when empty', () => {
    expect(component.formGroup.valid).toBeFalse();
  });

  it('should patch form with default values', () => {
    const mockClient: Client = {
      name: 'John Doe',
      gender: 'M',
      age: '30',
      identification: '12345',
      address: 'Some street',
      phone: '987654321',
      password: 'secret',
      id: '1',
      status: true
    };

    component.default = mockClient;
    component.ngOnChanges({
      default: {
        currentValue: mockClient,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.formGroup.value[CLIENT_FORM.Name]).toBe('John Doe');
    expect(component.formGroup.value[CLIENT_FORM.Age]).toBe(30);
    expect(component.formGroup.value[CLIENT_FORM.Password]).toBe('secret');
  });

  it('should emit form value on save when valid', () => {
    spyOn(component.actionForm, 'emit');

    component.formGroup.setValue({
      [CLIENT_FORM.Name]: 'Jane',
      [CLIENT_FORM.Gender]: 'F',
      [CLIENT_FORM.Age]: 25,
      [CLIENT_FORM.Identification]: '98765',
      [CLIENT_FORM.Addres]: 'Main Street',
      [CLIENT_FORM.Phone]: '123456789',
      [CLIENT_FORM.Password]: 'mypassword'
    });

    component.clickBtnSave();

    expect(component.actionForm.emit).toHaveBeenCalledWith(component.formGroup.getRawValue());
  });

  it('should not emit when form invalid', () => {
    spyOn(component.actionForm, 'emit');
    component.formGroup.patchValue({ [CLIENT_FORM.Name]: '' }); // invalidate
    component.clickBtnSave();
    expect(component.actionForm.emit).not.toHaveBeenCalled();
  });

  it('should navigate on cancel', () => {
    component.clickBtnCancel();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
