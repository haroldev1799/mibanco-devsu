import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "@app/shared/components/organisms/table/table.component";
import { MenuComponent } from "@app/shared/components/atoms/menu/menu.component";
import { optionsMenu } from '@app/core/dictionaries/options/options.value';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';
import { Router } from '@angular/router';
import { COLUMNS_CLIENT_LIST, MESSAGES } from './client-list.component.constants';
import { LoaderService } from '@app/shared/services/loader.service';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';

@Component({
  selector: 'app-client-list',
  imports: [TableComponent, MenuComponent, ButtonComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.sass'
})
export class ClientListComponent implements OnInit {

	private clientRepository = inject(ClientRepository);
	private router = inject(Router);
  private loaderService = inject(LoaderService);
  private modalService = inject(ModalMessageService);

  dataSource:any[] = [];

  columns = COLUMNS_CLIENT_LIST;
  options = Object.values(optionsMenu);

  buttonType = ButtonType;
  message = MESSAGES;

  ngOnInit(): void {
    this.loaderService.show();
    this.clientRepository.getAll().subscribe({
      next:(result: any) => {
        this.dataSource = [...result.data];
      },
      complete:() => this.loaderService.hide(),
    });
  }

  handleOption($event: number, rowData: any) {
    switch ($event) {
      case OPTIONS_CODE.EDIT:
        this.router.navigate([`${CLIENT_ROUTE_NAMES_GLOBAL.EDIT}/${rowData.id}`]);
        break;
      case OPTIONS_CODE.DELETE:
        this.modalService.open(MODAL_MESSAGES.modalDelete, () => {
          this._delete(rowData.id);
        });
        break;
    
      default:
        break;
    }
	}

  goCreate() {
    this.router.navigate([CLIENT_ROUTE_NAMES_GLOBAL.REGISTER]);
  }

  private _delete(id: string) {
    // this.loaderService.show();
    // this.heroesRepository.delete(id).subscribe({
    //   next:() => this.ngOnInit(),
    //   complete: () => this.loaderService.hide()
    // });
  }

}
