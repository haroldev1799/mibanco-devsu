import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesCreateComponent } from './client-create.component';
import { HeroesRepository } from '@app/modules/heroes/domain/repository/heroes.repository';
import { Router } from '@angular/router';
import { HeroForm } from '@app/modules/heroes/domain/dto/heroes.dto';
import { HEROE_ROUTE_NAMES_GLOBAL } from '@app/modules/heroes/heroes.routenames';

class MockHeroesRepository {
  create = jasmine.createSpy('create');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('HeroesCreateComponent', () => {
  let component: HeroesCreateComponent;
  let fixture: ComponentFixture<HeroesCreateComponent>;
  let mockRepo: MockHeroesRepository;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRepo = new MockHeroesRepository();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [HeroesCreateComponent],
      providers: [
        { provide: HeroesRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call HeroesRepository.create and navigate on saveForm', () => {
    const heroForm: HeroForm = {
      name: 'Thor',
      power: 'Thunder',
      universe: 'Marvel',
      age: 1500
    };

    component.saveForm(heroForm);

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.create).toHaveBeenCalledWith(jasmine.objectContaining({
      ...heroForm,
      createdAt: jasmine.any(Number),
      updatedAt: jasmine.any(Number)
    }));

    expect(mockRouter.navigate).toHaveBeenCalledWith([HEROE_ROUTE_NAMES_GLOBAL.LIST]);
  });
});
