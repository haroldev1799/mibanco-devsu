import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCreateComponent } from './client-create.component';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { Router } from '@angular/router';
import { Client } from '@app/modules/client/domain/dto/client.dto';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';

class MockClientRepository {
  create = jasmine.createSpy('create');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ClientCreateComponent', () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;
  let mockRepo: MockClientRepository;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRepo = new MockClientRepository();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [ClientCreateComponent], // standalone
      providers: [
        { provide: ClientRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ClientRepository.create and navigate on saveForm', () => {
    const clientForm: Client = {
      id: 'temp-id',
      name: 'Juan Pérez',
      gender: 'M',
      age: '30',
      identification: '12345678',
      address: 'Av. Siempre Viva 742',
      phone: '987654321',
      password: 'secret',
      status: true
    };

    component.saveForm(clientForm);

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.create).toHaveBeenCalledWith(jasmine.objectContaining({
      ...clientForm,
      createdAt: jasmine.any(Number),
      updatedAt: jasmine.any(Number)
    }));

    expect(mockRouter.navigate).toHaveBeenCalledWith([CLIENT_ROUTE_NAMES_GLOBAL.LIST]);
  });
});
