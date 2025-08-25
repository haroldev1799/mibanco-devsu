import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuData } from './menu.interface';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {

  @Input() options: MenuData[] = [];
  @Output() clickOption = new EventEmitter<number>();

  selectOption(option: number | undefined) {
    this.clickOption.emit(option);
  }
}
