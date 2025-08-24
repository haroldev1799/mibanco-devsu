import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-not-result',
	imports: [CommonModule],
  templateUrl: './card-not-result.component.html',
  styleUrl: './card-not-result.component.sass',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNotResultComponent {

	@Input() message = 'No hay elementos.';
	@Input() classesNotResult = 'default';
}
