import { Routes } from '@angular/router';
import { APP_ROUTE_NAMES } from './app.routenames';

export const routes: Routes = [
	{
		path: APP_ROUTE_NAMES.CLIENT,
		loadChildren: () => import('./modules/client/client.routes').then((m) => m.routes),
	},
	{
		path: APP_ROUTE_NAMES.ACCOUNT,
		loadChildren: () => import('./modules/account/account.routes').then((m) => m.routes),
	},
	{
		path: APP_ROUTE_NAMES.MOVEMENTS,
		loadChildren: () => import('./modules/movement/movement.routes').then((m) => m.routes),
	},
	{
		path: APP_ROUTE_NAMES.REPORTES,
		loadChildren: () => import('./modules/report/rerpot.routes').then((m) => m.routes),
	},
	{
		path: '**',
		redirectTo: APP_ROUTE_NAMES.CLIENT,
	},
];
