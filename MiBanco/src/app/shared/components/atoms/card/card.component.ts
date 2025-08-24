import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, CommonModule],
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
