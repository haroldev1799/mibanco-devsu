import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { ACCOUNT_ROUTE_NAMES } from './account.routenames';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: ACCOUNT_ROUTE_NAMES.LIST,
				loadComponent: () => import('./presentation/pages/account-list/account-list.component').then((m) => m.AccountListComponent),
			},
			{
				path: ACCOUNT_ROUTE_NAMES.REGISTER,
				loadComponent: () => import('./presentation/pages/account-create/account-create.component').then((m) => m.AccountCreateComponent),
			},
			{
				path: `${ACCOUNT_ROUTE_NAMES.EDIT}/:id`,
				loadComponent: () =>
					import('./presentation/pages/account-edit/account-edit.component').then((m) => m.AccountEditComponent),
			},
			{
				path: '',
				redirectTo: ACCOUNT_ROUTE_NAMES.LIST,
				pathMatch: 'full',
			},
		],
	},
];
