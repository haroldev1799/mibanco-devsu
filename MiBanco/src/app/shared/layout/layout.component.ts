import { Component, inject } from '@angular/core';
import { LAYOUT_IMPORTS } from './layout.component.constant';
import { Router } from '@angular/router';
import { MOVEMENT_ROUTE_NAMES_GLOBAL } from '@app/modules/movement/movement.routenames';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';
import { ACCOUNT_ROUTE_NAMES_GLOBAL } from '@app/modules/account/account.routenames';
import { REPORT_ROUTE_NAMES_GLOBAL } from '@app/modules/report/rerpot.routenames';

@Component({
  selector: 'app-layout',
  imports: [...LAYOUT_IMPORTS],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

  private router = inject(Router);

  clientRoutes = CLIENT_ROUTE_NAMES_GLOBAL;
  accountRoutes = ACCOUNT_ROUTE_NAMES_GLOBAL;
  movementRoutes = MOVEMENT_ROUTE_NAMES_GLOBAL;
  reportRoutes = REPORT_ROUTE_NAMES_GLOBAL;

  redirect(route: string){
    this.router.navigate([route]);
  }
}
