import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementCreateComponent } from './movement-create.component';
import { Router } from '@angular/router';
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { of } from 'rxjs';
import { MovementForm } from '@app/modules/movement/domain/dto/movement.dto';
import { SELECT_TYPE_MOVEMENT } from '../../components/movement-form/movement-form.component.constant';

// ==== Mocks =====
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockMovementsRepository {
  create = jasmine.createSpy().and.returnValue(of({}));
}

describe('MovementCreateComponent', () => {
  let component: MovementCreateComponent;
  let fixture: ComponentFixture<MovementCreateComponent>;
  let mockRepo: MockMovementsRepository;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementCreateComponent], // standalone
      providers: [
        { provide: MovementsRepository, useClass: MockMovementsRepository },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementCreateComponent);
    component = fixture.componentInstance;
    mockRepo = TestBed.inject(MovementsRepository) as unknown as MockMovementsRepository;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('Registrar Héroe');
  });

  it('debería guardar un movimiento tipo RETIRO con amount negativo', () => {
    const form: MovementForm = {
      transaction_type: SELECT_TYPE_MOVEMENT.RETIRO,
      amount: 200,
      account_id: 1,
      date: '01/01/2000'
    };

    component.saveForm(form);

    expect(mockRepo.create).toHaveBeenCalledWith({
      transaction_type: SELECT_TYPE_MOVEMENT.RETIRO,
      amount: -200, // debe ser negativo
      account_id: 1
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movement/list']);
  });

  it('debería guardar un movimiento tipo DEPOSITO con amount positivo', () => {
    const form: MovementForm = {
      transaction_type: 'DEPOSITO',
      amount: -300, // aunque venga negativo
      account_id: 2,
      date: '01/01/2000'
    };

    component.saveForm(form);

    expect(mockRepo.create).toHaveBeenCalledWith({
      transaction_type: 'DEPOSITO',
      amount: 300, // debe corregirse a positivo
      account_id: 2
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movement/list']);
  });
});
