import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { CLIENT_ROUTE_NAMES } from './client.routenames';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: CLIENT_ROUTE_NAMES.LIST,
				loadComponent: () => import('./presentation/pages/client-list/client-list.component').then((m) => m.ClientListComponent),
			},
			{
				path: CLIENT_ROUTE_NAMES.REGISTER,
				loadComponent: () => import('./presentation/pages/client-create/client-create.component').then((m) => m.ClientCreateComponent),
			},
			{
				path: `${CLIENT_ROUTE_NAMES.EDIT}/:id`,
				loadComponent: () =>
					import('./presentation/pages/client-edit/client-edit.component').then((m) => m.ClientEditComponent),
			},
			{
				path: '',
				redirectTo: CLIENT_ROUTE_NAMES.LIST,
				pathMatch: 'full',
			},
		],
	},
];
