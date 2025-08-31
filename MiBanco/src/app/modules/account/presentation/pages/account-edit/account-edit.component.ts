import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ACCOUNT_ROUTE_NAMES_GLOBAL } from '@app/modules/account/account.routenames';
import { AccountForm, DetailAccountResponse } from '@app/modules/account/domain/dto/account.dto';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { AccountFormComponent } from "../../components/account-form/account-form.component";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.sass',
  imports: [AccountFormComponent]
})
export class AccountEditComponent  {

  private accountId: string = '';
	private accountesRepository = inject(AccountRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  title: string = 'Editar Héroe';
  account: AccountForm | null = null;


  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id') ?? '';
    this._getDetail();
  }

  editForm(event: AccountForm){
    const { initial_balance, ...data } = event;
    this.accountesRepository.update({
      ...data,
      id: Number(this.accountId ?? '0'),
    }).subscribe({
      next: (response) => {
        this.router.navigate([`${ACCOUNT_ROUTE_NAMES_GLOBAL.LIST}`]);
      }
    });
  }

  private _getDetail() {
    this.accountesRepository.getById(this.accountId).subscribe({
      next:(result: DetailAccountResponse | null) => {
        if(result)
          this.account = result.data;
      },
      complete: () => {

      }
    });
  }
}
