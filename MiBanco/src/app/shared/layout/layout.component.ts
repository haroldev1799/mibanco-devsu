import { Component } from '@angular/core';
import { LAYOUT_IMPORTS } from './layout.component.constant';

@Component({
  selector: 'app-layout',
  imports: [...LAYOUT_IMPORTS],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

}
