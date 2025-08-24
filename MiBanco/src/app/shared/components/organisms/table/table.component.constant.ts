import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CardNotResultComponent } from '../../molecules/card-not-result/card-not-result.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export const TABLE_IMPORTS = [
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    CardNotResultComponent,
	CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
];

