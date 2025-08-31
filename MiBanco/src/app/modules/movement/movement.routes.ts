import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { MOVEMENT_ROUTE_NAMES } from './movement.routenames';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: MOVEMENT_ROUTE_NAMES.LIST,
				loadComponent: () => import('./presentation/pages/movement-list/movement-list.component').then((m) => m.MovementListComponent),
			},
			{
				path: MOVEMENT_ROUTE_NAMES.REGISTER,
				loadComponent: () => import('./presentation/pages/movement-create/movement-create.component').then((m) => m.MovementCreateComponent),
			},
			{
				path: `${MOVEMENT_ROUTE_NAMES.EDIT}/:id`,
				loadComponent: () =>
					import('./presentation/pages/movement-edit/movement-edit.component').then((m) => m.MovementEditComponent),
			},
			{
				path: '',
				redirectTo: MOVEMENT_ROUTE_NAMES.LIST,
				pathMatch: 'full',
			},
		],
	},
];
