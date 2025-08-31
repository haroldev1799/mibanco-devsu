import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientListComponent } from './client-list.component';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { Router } from '@angular/router';
import { LoaderService } from '@app/shared/services/loader.service';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let mockRepo: any;
  let mockRouter: any;
  let mockLoader: any;
  let mockModal: any;

  beforeEach(async () => {
    mockRepo = {
      getAll: jasmine.createSpy('getAll').and.returnValue(
        of({ data: [], message: 'ok', success: true, status: 200 })
      ),
      delete: jasmine.createSpy('delete').and.returnValue(
        of({ data: '1', message: 'ok', success: true, status: 200 })
      )
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLoader = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    mockModal = jasmine.createSpyObj('ModalMessageService', ['open']);

    await TestBed.configureTestingModule({
      imports: [ClientListComponent],
      providers: [
        { provide: ClientRepository, useValue: mockRepo },
        { provide: Router, useValue: mockRouter },
        { provide: LoaderService, useValue: mockLoader },
        { provide: ModalMessageService, useValue: mockModal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockLoader.show).toHaveBeenCalled();
    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(mockLoader.hide).toHaveBeenCalled();
  });

  it('should navigate to create on goCreate()', () => {
    component.goCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['cliente/crear']);
  });

  it('should call router.navigate on EDIT option', () => {
    const client = { id: '123', name: 'Juan Pérez' } as any;
    component.handleOption(OPTIONS_CODE.EDIT, client);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['cliente/editar/123']);
  });

  it('should call modalService.open on DELETE option', () => {
    const client = { id: '123', name: 'Juan Pérez' } as any;
    component.handleOption(OPTIONS_CODE.DELETE, client);
    expect(mockModal.open).toHaveBeenCalledWith(MODAL_MESSAGES.modalDelete, jasmine.any(Function));
  });

  it('should call delete and refresh list on _delete()', () => {
    spyOn(component as any, 'ngOnInit').and.callThrough();

    (component as any)._delete('123');

    expect(mockLoader.show).toHaveBeenCalled();
    expect(mockRepo.delete).toHaveBeenCalledWith('123');
    expect((component as any).ngOnInit).toHaveBeenCalled();
    expect(mockLoader.hide).toHaveBeenCalled();
  });
});
