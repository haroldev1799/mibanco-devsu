import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementListComponent } from './movement-list.component';
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MOVEMENT_ROUTE_NAMES_GLOBAL } from '@app/modules/movement/movement.routenames';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';
import { ListMovementResponse, Movement } from '@app/modules/movement/domain/dto/movement.dto';

// ==== Mocks ====
const mockMovements: Movement[] = [
  {
    id: '1',
    date: '2025-08-31',
    transaction_type: 'DEBIT',
    amount: 100,
    balance: 900,
    account_id: 10,
    account: 'Cuenta A',
    client: 'Cliente X'
  },
  {
    id: '2',
    date: '2025-08-31',
    transaction_type: 'CREDIT',
    amount: 200,
    balance: 1100,
    account_id: 10,
    account: 'Cuenta A',
    client: 'Cliente X'
  }
];

class MockMovementsRepository {
  getAll = jasmine.createSpy('getAll').and.returnValue(of({ data: mockMovements } as any));
  delete = jasmine.createSpy('delete').and.returnValue(of(void 0));
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('MovementListComponent', () => {
  let component: MovementListComponent;
  let fixture: ComponentFixture<MovementListComponent>;
  let mockRepo: MockMovementsRepository;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRepo = new MockMovementsRepository();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [MovementListComponent],
      providers: [
        { provide: MovementsRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movements on init', () => {
    component.ngOnInit();
    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(component.dataSource.length).toBe(2);
    expect(component.dataSource[0].transaction_type).toBe('DEBIT');
  });

  it('should navigate to edit page when handleOption EDIT is called', () => {
    const row = mockMovements[0];
    component.handleOption(OPTIONS_CODE.EDIT, row);
    expect(mockRouter.navigate).toHaveBeenCalledWith([`${MOVEMENT_ROUTE_NAMES_GLOBAL.EDIT}/${row.id}`]);
  });

  it('should call delete when handleOption DELETE is called', () => {
    spyOn(component as any, '_delete').and.callThrough();
    const row = mockMovements[0];

    component.handleOption(OPTIONS_CODE.DELETE, row);

    expect((component as any)._delete).toHaveBeenCalledWith(row.id);
    expect(mockRepo.delete).toHaveBeenCalledWith({ id: row.id });
  });

  it('should navigate to create page when goCreate is called', () => {
    component.goCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith([MOVEMENT_ROUTE_NAMES_GLOBAL.REGISTER]);
  });
});
