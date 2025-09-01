import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { ACCOUNT_LIST_IMPORTS, COLUMNS_ACCOUNT_LIST, MESSAGES } from './account-list.component.constants';
import { optionsMenu } from '@app/core/dictionaries/options/options.value';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { ACCOUNT_ROUTE_NAMES_GLOBAL } from '@app/modules/account/account.routenames';
import { Account, ListAccountResponse } from '@app/modules/account/domain/dto/account.dto';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';

@Component({
  selector: 'app-account-list',
  imports: [...ACCOUNT_LIST_IMPORTS],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.sass'
})
export class AccountListComponent  {

	private heroesRepository = inject(AccountRepository);
	private router = inject(Router);

  dataSource: any[] = [];

  columns = COLUMNS_ACCOUNT_LIST;
  options = Object.values(optionsMenu);

  buttonType = ButtonType;
  message = MESSAGES;

  ngOnInit(): void {
    this.heroesRepository.getAll().subscribe({
      next:(result: ListAccountResponse) => {
        this.dataSource = [...result.data];
      },
    });
  }

  handleOption($event: number, rowData: Account) {
    switch ($event) {
      case OPTIONS_CODE.EDIT:
        this.router.navigate([`${ACCOUNT_ROUTE_NAMES_GLOBAL.EDIT}/${rowData.id}`]);
        break;
      case OPTIONS_CODE.DELETE:
        this._delete(rowData.id);
        break;
    
      default:
        break;
    }
	}

  goCreate() {
    this.router.navigate([ACCOUNT_ROUTE_NAMES_GLOBAL.REGISTER]);
  }

  private _delete(id: number) {
    this.heroesRepository.delete({id}).subscribe({
      next:() => this.ngOnInit(),
    });
  }

}
