import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreateComponent } from './account-create.component';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { Router } from '@angular/router';

describe('AccountCreateComponent', () => {
  let component: AccountCreateComponent;
  let fixture: ComponentFixture<AccountCreateComponent>;
  let mockAccountRepository: jasmine.SpyObj<AccountRepository>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAccountRepository = jasmine.createSpyObj('AccountRepository', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AccountCreateComponent],
      providers: [
        { provide: AccountRepository, useValue: mockAccountRepository },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

});
