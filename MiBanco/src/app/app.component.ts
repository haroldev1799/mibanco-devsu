import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalLoaderComponent } from './shared/components/molecules/modals/modal-loader/modal-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {}
