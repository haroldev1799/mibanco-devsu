import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonData, ButtonType, ButtonTypeComponent } from './button.interface';
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'app-button',
	imports: [MatButtonModule],
	templateUrl: './button.component.html',
	styleUrl: './button.component.sass',
})
export class ButtonComponent {
	private static uniqueId = 0;

	@Input() data: ButtonData | null = null;
	@Input() label?: string;
	@Input() severity: string = ButtonType.PRIMARY;
	@Input() type: string = ButtonTypeComponent.BUTTON;
	@Input() disabled = false;
	@Input() isFullWidth = false;

	@Output() clicked = new EventEmitter();

	readonly buttonId = `app-button-${ButtonComponent.uniqueId++}`;

	readonly BUTTON_TYPE = ButtonType;

	onClicked($event: MouseEvent) {
		if (!this.disabled) this.clicked.emit($event);
	}
}
