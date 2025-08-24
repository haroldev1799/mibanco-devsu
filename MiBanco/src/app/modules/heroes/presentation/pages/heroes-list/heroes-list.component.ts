import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "@app/shared/components/organisms/table/table.component";
import { MatTableDataSource } from '@angular/material/table';
import { MenuComponent } from "@app/shared/components/atoms/menu/menu.component";
import { optionsMenu } from '@app/core/dictionaries/options/options.value';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { HeroesRepository } from '@app/modules/heroes/domain/repository/heroes.repository';
import { Hero, HeroResponse } from '@app/modules/heroes/domain/dto/heroes.dto';
import { OPTIONS_CODE } from '@app/core/enums/options.enum';
import { Router } from '@angular/router';
import { HEROE_ROUTE_NAMES_GLOBAL } from '@app/modules/heroes/heroes.routenames';
import { COLUMNS_HEROES_LIST, MESSAGES } from './heroes-list.component.constants';
import { LoaderService } from '@app/shared/services/loader.service';
import { ModalMessageService } from '@app/shared/services/modal-message.service';
import { MODAL_MESSAGES } from '@app/core/dictionaries/messages/messages-crud';

@Component({
  selector: 'app-heroes-list',
  imports: [TableComponent, MenuComponent, ButtonComponent],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.sass'
})
export class HeroesListComponent implements OnInit {

	private heroesRepository = inject(HeroesRepository);
	private router = inject(Router);
  private loaderService = inject(LoaderService);
  private modalService = inject(ModalMessageService);

  dataSource = new MatTableDataSource<Hero>();

  columns = COLUMNS_HEROES_LIST;
  options = Object.values(optionsMenu);

  buttonType = ButtonType;
  message = MESSAGES;

  ngOnInit(): void {
    this.loaderService.show();
    this.heroesRepository.getAll().subscribe({
      next:(result: HeroResponse) => {
        this.dataSource.data = [...result.data];
      },
      complete:() => this.loaderService.hide(),
    });
  }

  handleOption($event: number, rowData: Hero) {
    switch ($event) {
      case OPTIONS_CODE.EDIT:
        this.router.navigate([`${HEROE_ROUTE_NAMES_GLOBAL.EDIT}/${rowData.id}`]);
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
    this.router.navigate([HEROE_ROUTE_NAMES_GLOBAL.REGISTER]);
  }

  private _delete(id: string) {
    this.loaderService.show();
    this.heroesRepository.delete(id).subscribe({
      next:() => this.ngOnInit(),
      complete: () => this.loaderService.hide()
    });
  }

}
