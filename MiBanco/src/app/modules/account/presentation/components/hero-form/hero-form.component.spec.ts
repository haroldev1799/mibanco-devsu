import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@app/shared/components/atoms/snackbar/snackbar.component';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { HeroForm } from '@app/modules/heroes/domain/dto/heroes.dto';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockModal: jasmine.SpyObj<ModalMessageService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    mockModal = jasmine.createSpyObj('ModalMessageService', ['open']);

    await TestBed.configureTestingModule({
      imports: [HeroFormComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ModalMessageService, useValue: mockModal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.formGroup).toBeDefined();
  });

  it('should patch form values when default input is set', () => {
    const hero: HeroForm = { name: 'Batman', power: 'Money', universe: 'DC', age: 40 };
    component.default = hero;
    component.ngOnChanges({ default: { currentValue: hero, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.formGroup.value).toEqual({
      name: [hero.name],
      power: [hero.power],
      universe: [hero.universe],
      age: [hero.age]
    });
  });

  it('should show snackbar when form is invalid on save', () => {
    component.formGroup.reset();
    component.clickBtnSave();

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
      duration: 2000,
      data: { message: 'Por favor completa los campos requeridos' }
    });
    expect(mockModal.open).not.toHaveBeenCalled();
  });

  it('should open modal and emit form value when form is valid on save', () => {
    spyOn(component.actionForm, 'emit');
    const heroForm: HeroForm = { name: 'Iron Man', power: 'Armor', universe: 'Marvel', age: 45 };
    component.formGroup.setValue(heroForm);

    mockModal.open.and.callFake((_data, onConfirm) => onConfirm && onConfirm());

    component.clickBtnSave();

    expect(mockModal.open).toHaveBeenCalledWith(MODAL_MESSAGES.modalConfirmSave, jasmine.any(Function));
    expect(component.actionForm.emit).toHaveBeenCalledWith(heroForm);
  });

  it('should open cancel modal and navigate when confirmed', () => {
    mockModal.open.and.callFake((_data, onConfirm) => onConfirm && onConfirm());

    component.clickBtnCancel();

    expect(mockModal.open).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
