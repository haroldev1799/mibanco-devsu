import { FormsModule } from '@angular/forms';
import { CardComponent } from "@app/shared/components/atoms/card/card.component";
import { InputComponent } from '@app/shared/components/atoms/input/input.component';
import { HeroForm } from '../../../domain/dto/heroes.dto';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";

export const HERO_FORM_IMPORTS = [
    FormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent
];

export const HERO_FORM = {
	Name: 'name',
	Power: 'power',
	Universe: 'universe',
    Age: 'age'
} as const satisfies Record<string, keyof HeroForm>;