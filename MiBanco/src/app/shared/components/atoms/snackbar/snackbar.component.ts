import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [MatSnackBarLabel],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.sass'
})
export class SnackbarComponent {

  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);


}
