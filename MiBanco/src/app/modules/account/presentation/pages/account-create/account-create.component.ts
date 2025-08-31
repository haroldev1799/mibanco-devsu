import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACCOUNT_ROUTE_NAMES_GLOBAL } from '@app/modules/account/account.routenames';
import { AccountForm } from '@app/modules/account/domain/dto/account.dto';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { AccountFormComponent } from '../../components/account-form/account-form.component';


@Component({
  selector: 'app-heroes-create',
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.sass',
  imports: [AccountFormComponent]
})
export class AccountCreateComponent {

	private accountRepository = inject(AccountRepository);
  private router = inject(Router);

  title: string = 'Registrar Cuenta';

  saveForm(event: AccountForm){
    this.accountRepository.create({
      ...event
    }).subscribe({
      next: () => {
        this.router.navigate([`${ACCOUNT_ROUTE_NAMES_GLOBAL.LIST}`]);
      }
    });
  }
}