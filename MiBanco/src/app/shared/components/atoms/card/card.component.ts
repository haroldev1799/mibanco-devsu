import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent {
	@ContentChild('customHeader') customHeader!: TemplateRef<any>;
	@ContentChild('customContent') customContent!: TemplateRef<any>;
	@ContentChild('customActions') customActions!: TemplateRef<any>;

  @Input() title!: string;
  @Input() subTitle!: string;

  @Input() customActionsClass!: string;

}
