import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { REPORT_ROUTE_NAMES } from './rerpot.routenames';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: REPORT_ROUTE_NAMES.LIST,
				loadComponent: () => import('./presentation/pages/rerpot-list/report-list.component').then((m) => m.ReportListComponent),
			},
			{
				path: '',
				redirectTo: REPORT_ROUTE_NAMES.LIST,
				pathMatch: 'full',
			},
		],
	},
];
