import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportListComponent } from './report-list.component';
import { ReportRepository } from '@app/modules/report/domain/repository/report.repository';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

// ==== Mocks =====
class MockReportRepository {
  getAll = jasmine.createSpy().and.returnValue(of({ data: [{ id: 1, name: 'Reporte 1' }] } as any));
  generateReport = jasmine.createSpy().and.returnValue(of(new Blob(['mock'], { type: 'application/pdf' })));
}

class MockClientRepository {
  getAll = jasmine.createSpy().and.returnValue(of({ data: [{ id: 1, name: 'Cliente X' }] }));
}

class MockAccountRepository {
  getAll = jasmine.createSpy().and.returnValue(of({ data: [{ id: 2, account_number: '12345' }] }));
}

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;
  let mockReportRepo: MockReportRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportListComponent], // Standalone
      providers: [
        { provide: ReportRepository, useClass: MockReportRepository },
        { provide: ClientRepository, useClass: MockClientRepository },
        { provide: AccountRepository, useClass: MockAccountRepository },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    mockReportRepo = TestBed.inject(ReportRepository) as unknown as MockReportRepository;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar ngOnInit y cargar data', () => {
    component.ngOnInit();
    expect(mockReportRepo.getAll).toHaveBeenCalled();
    expect(component.dataSource.length).toBe(1);
    expect(component.optionsClient[0].name).toBe('Cliente X');
    expect(component.optionsAccount[0].name).toBe('12345');
  });

  it('debería ejecutar search() y asignar dataSource', () => {
    component.ngOnInit();
    component.search();
    expect(mockReportRepo.getAll).toHaveBeenCalled();
    expect(component.dataSource.length).toBe(1);
  });

  it('debería limpiar filtros con cleanFilter()', () => {
    component.ngOnInit();
    component.formGroup.patchValue({ client_id: 1, account_id: 2, date: new Date() });

    component.cleanFilter();

    expect(component.formGroup.value).toEqual({ client_id: null, account_id: null, date: null });
    expect(mockReportRepo.getAll).toHaveBeenCalled();
  });

  it('debería generar reporte con download()', () => {
    spyOn(document, 'createElement').and.callFake(() => {
      return {
        href: '',
        download: '',
        click: jasmine.createSpy('click')
      } as unknown as HTMLAnchorElement;
    });

    component.ngOnInit();
    component.download(1);

    expect(mockReportRepo.generateReport).toHaveBeenCalledWith(null, null, null, 1);
  });

  it('debería manejar error en search()', () => {
    mockReportRepo.getAll = jasmine.createSpy().and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.search();

    expect(console.error).toHaveBeenCalled();
  });
});
