import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountEditComponent } from './account-edit.component';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AccountForm, DetailAccountResponse } from '@app/modules/account/domain/dto/account.dto';

describe('AccountEditComponent', () => {
  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;
  let mockRepo: jasmine.SpyObj<AccountRepository>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRepo = jasmine.createSpyObj('AccountRepository', ['getById', 'update']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AccountEditComponent],
      providers: [
        { provide: AccountRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountEditComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

//   it('ngOnInit debería obtener el id de la ruta y llamar a getById', () => {
//     const mockResponse: DetailAccountResponse = { data: {
//       account_number: '001',
//       type: 'SAVINGS',
//       initial_balance: 100, 
//       daily_limit_amount: 50,
//       status: true,
//       client_id: 1,
//       id: '1',
//     }};
//     mockRepo.getById.and.returnValue(of(mockResponse));

//     component.ngOnInit();

//     expect(mockRepo.getById).toHaveBeenCalledWith('123');
//     expect(component.account).toEqual(mockResponse.data);
//   });

//   it('_getDetail no debe asignar nada si la respuesta es null', () => {
//     mockRepo.getById.and.returnValue(of(null));

//     component['accountId'] = '123';
//     component['_' + 'getDetail'](); // llamada directa al private (o usa ngOnInit)

//     expect(component.account).toBeNull();
//   });

  it('editForm debería llamar a update con los datos correctos', () => {
    const formData: AccountForm = {
      account_number: '123',
      type: 'SAVINGS',
      initial_balance: 100,
      daily_limit_amount: 500,
      status: true,
      client_id: 1
    };

    mockRepo.update.and.returnValue(of({} as any));
    component['accountId'] = '123';

    component.editForm(formData);

    expect(mockRepo.update).toHaveBeenCalledWith({ ...formData, id: 123 });
  });

  it('editForm debería navegar al listado después de actualizar', () => {
    const formData: AccountForm = {
      account_number: '123',
      type: 'SAVINGS',
      initial_balance: 100,
      daily_limit_amount: 500,
      status: true,
      client_id: 1
    };

    mockRepo.update.and.returnValue(of({} as any));
    component['accountId'] = '123';

    component.editForm(formData);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/list']);
  });
});
