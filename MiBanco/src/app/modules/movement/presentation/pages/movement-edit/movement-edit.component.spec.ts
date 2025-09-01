import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementEditComponent } from './movement-edit.component';
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DetailMovementResponse } from '@app/modules/movement/domain/dto/movement.dto';

// ==== Mocks =====
class MockMovementsRepository {
  getById = jasmine.createSpy().and.returnValue(
    of({
      data: {
        id: '1',
        transaction_type: 'RETIRO',
        amount: 100,
        account_id: 2
      }
    } as DetailMovementResponse)
  );
}

describe('MovementEditComponent', () => {
  let component: MovementEditComponent;
  let fixture: ComponentFixture<MovementEditComponent>;
  let mockRepo: MockMovementsRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementEditComponent], // standalone
      providers: [
        { provide: MovementsRepository, useClass: MockMovementsRepository },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', '1']]) // simula /movement/1
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementEditComponent);
    component = fixture.componentInstance;
    mockRepo = TestBed.inject(MovementsRepository) as unknown as MockMovementsRepository;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('Editar Héroe');
  });

  it('debería obtener heroId desde ActivatedRoute en ngOnInit()', () => {
    component.ngOnInit();
    expect((component as any).heroId).toBe('1');
    expect(mockRepo.getById).toHaveBeenCalledWith('1');
  });
});
