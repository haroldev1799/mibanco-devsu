import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { HEROE_ROUTE_NAMES } from './heroes.routenames';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: HEROE_ROUTE_NAMES.LIST,
				loadComponent: () => import('./presentation/pages/heroes-list/heroes-list.component').then((m) => m.HeroesListComponent),
			},
			{
				path: HEROE_ROUTE_NAMES.REGISTER,
				loadComponent: () => import('./presentation/pages/heroes-create/heroes-create.component').then((m) => m.HeroesCreateComponent),
			},
			{
				path: `${HEROE_ROUTE_NAMES.EDIT}/:id`,
				loadComponent: () =>
					import('./presentation/pages/heroes-edit/heroes-edit.component').then((m) => m.HeroesEditComponent),
			},
			{
				path: '',
				redirectTo: HEROE_ROUTE_NAMES.LIST,
				pathMatch: 'full',
			},
		],
	},
];
