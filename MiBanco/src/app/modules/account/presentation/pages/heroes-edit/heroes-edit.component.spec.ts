import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroesEditComponent } from './heroes-edit.component';
import { HeroesRepository } from '@app/modules/heroes/domain/repository/heroes.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroForm, DetailHeroResponse, Hero } from '@app/modules/heroes/domain/dto/heroes.dto';
import { SnackbarComponent } from '@app/shared/components/atoms/snackbar/snackbar.component';

describe('HeroesEditComponent', () => {
  let component: HeroesEditComponent;
  let fixture: ComponentFixture<HeroesEditComponent>;
  let mockRepo: any;
  let mockRouter: any;
  let mockRoute: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockRepo = {
      update: jasmine.createSpy('update'),
      getById: jasmine.createSpy('getById').and.returnValue(of(null)) // default
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      snapshot: { paramMap: new Map([['id', '123']]) }
    };
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    await TestBed.configureTestingModule({
      imports: [HeroesEditComponent], // standalone
      providers: [
        { provide: HeroesRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['heroId']).toBe('123'); // del ActivatedRoute
    expect(mockRepo.getById).toHaveBeenCalledWith('123');
  });

  it('should open snackbar when getById returns null', () => {
    mockRepo.getById.and.returnValue(of(null));

    (component as any)._getDetail();

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
      duration: 2000,
      data: { message: 'No se encontró la héroe.' }
    });
  });
});
