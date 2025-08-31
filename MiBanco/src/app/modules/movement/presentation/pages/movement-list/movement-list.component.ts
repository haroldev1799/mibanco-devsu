import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "@app/shared/components/organisms/table/table.component";
import { MenuComponent } from "@app/shared/components/atoms/menu/menu.component";
import { optionsMenu } from '@app/core/dictionaries/options/options.value';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { Router } from '@angular/router';
import { COLUMNS_MOVEMENTS_LIST, MESSAGES } from './movement-list.component.constants';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { ListMovementResponse, Movement } from '@app/modules/movement/domain/dto/movement.dto';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';
import { MOVEMENT_ROUTE_NAMES_GLOBAL } from '@app/modules/movement/movement.routenames';

@Component({
  selector: 'app-movenent-list',
  imports: [TableComponent, MenuComponent, ButtonComponent],
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.sass'
})
export class MovementListComponent {

	private movementsRepository = inject(MovementsRepository);
	private router = inject(Router);

  dataSource: Movement[] = [];

  columns = COLUMNS_MOVEMENTS_LIST;
  options = Object.values(optionsMenu);

  buttonType = ButtonType;
  message = MESSAGES;

  ngOnInit(): void {
    this.movementsRepository.getAll().subscribe({
      next:(result: ListMovementResponse) => {
        this.dataSource = [...result.data];
      },
    });
  }

  handleOption($event: number, rowData: Movement) {
    switch ($event) {
      case OPTIONS_CODE.EDIT:
        this.router.navigate([`${MOVEMENT_ROUTE_NAMES_GLOBAL.EDIT}/${rowData.id}`]);
        break;
      case OPTIONS_CODE.DELETE:
        this._delete(rowData.id);
        break;
    
      default:
        break;
    }
	}

  goCreate() {
    this.router.navigate([MOVEMENT_ROUTE_NAMES_GLOBAL.REGISTER]);
  }

  private _delete(id: string) {
    this.movementsRepository.delete({id}).subscribe({
      next:() => this.ngOnInit(),
    });
  }

}
