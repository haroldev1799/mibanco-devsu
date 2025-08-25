import { Component, inject } from '@angular/core';
import { LAYOUT_IMPORTS } from './layout.component.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [...LAYOUT_IMPORTS],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

  private router = inject(Router);

  redirect(route: string){
    this.router.navigate([route]);
  }
}
