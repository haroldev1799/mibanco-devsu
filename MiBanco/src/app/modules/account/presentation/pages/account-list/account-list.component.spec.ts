import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountListComponent } from './account-list.component';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ListAccountResponse } from '@app/modules/account/domain/dto/account.dto';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let mockRepo: jasmine.SpyObj<AccountRepository>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRepo = jasmine.createSpyObj('AccountRepository', ['getAll', 'delete']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AccountListComponent],
      providers: [
        { provide: AccountRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

//   it('ngOnInit debería obtener cuentas y setear dataSource', () => {
//     const mockResponse: ListAccountResponse = { data: [{ id: '1', name: 'Cliente 1' }] as any };
//     mockRepo.getAll.and.returnValue(of(mockResponse));

//     component.ngOnInit();

//     expect(mockRepo.getAll).toHaveBeenCalled();
//     expect(component.dataSource).toEqual(mockResponse.data);
//   });

  it('handleOption con EDIT debería navegar al formulario de edición', () => {
    const rowData = { id: '10' } as any;

    component.handleOption(OPTIONS_CODE.EDIT, rowData);

    expect(mockRouter.navigate).toHaveBeenCalledWith([`/account/edit/${rowData.id}`]);
  });

  it('handleOption con DELETE debería llamar a _delete', () => {
    const rowData = { id: '20' } as any;
    spyOn<any>(component, '_delete'); // espía sobre el método privado

    component.handleOption(OPTIONS_CODE.DELETE, rowData);

    expect(component['_delete']).toHaveBeenCalledWith(rowData.id);
  });

//   it('_delete debería invocar repo.delete y volver a cargar data', () => {
//     const mockResponse: ListAccountResponse = { data: [{ id: '1', name: 'Cliente 1' }] as any };
//     mockRepo.delete.and.returnValue(of({}));
//     mockRepo.getAll.and.returnValue(of(mockResponse));

//     component['_delete']('1');

//     expect(mockRepo.delete).toHaveBeenCalledWith({ id: '1' });
//     expect(mockRepo.getAll).toHaveBeenCalled(); // porque ngOnInit se vuelve a ejecutar
//   });

  it('goCreate debería navegar al registro de cuentas', () => {
    component.goCreate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/register']);
  });
});
