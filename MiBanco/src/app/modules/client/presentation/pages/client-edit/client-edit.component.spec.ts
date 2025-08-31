import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientEditComponent } from './client-edit.component';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, DetailClientResponse } from '@app/modules/client/domain/dto/client.dto';

describe('ClientEditComponent', () => {
  let component: ClientEditComponent;
  let fixture: ComponentFixture<ClientEditComponent>;
  let mockRepo: any;
  let mockRouter: any;
  let mockRoute: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockRepo = {
      update: jasmine.createSpy('update'),
      getById: jasmine.createSpy('getById').and.returnValue(of(null)) // por defecto retorna null
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      snapshot: { paramMap: new Map([['id', '123']]) }
    };
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    await TestBed.configureTestingModule({
      imports: [ClientEditComponent], // standalone
      providers: [
        { provide: ClientRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and call getById with route param', () => {
    expect(component).toBeTruthy();
    expect((component as any).clientId).toBe('123'); // viene de ActivatedRoute
    expect(mockRepo.getById).toHaveBeenCalledWith('123');
  });

  it('should call update on save', () => {
    const mockClient: Client = {
      id: '123',
      name: 'Juan Pérez',
      gender: 'M',
      age: '30',
      identification: '987654',
      address: 'Calle Falsa 123',
      phone: '999888777',
      password: 'secret',
      status: true
    };

    mockRepo.update.and.returnValue(of({ success: true, data: mockClient }));

    (component as any)._update(mockClient);

    expect(mockRepo.update).toHaveBeenCalledWith('123', mockClient);
  });
});
