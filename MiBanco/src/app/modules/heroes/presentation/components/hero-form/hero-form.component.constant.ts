import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "@app/shared/components/atoms/card/card.component";
import { InputComponent } from '@app/shared/components/atoms/input/input.component';
import { HeroForm } from '../../../domain/dto/heroes.dto';
import { MatCardActions } from "@angular/material/card";
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";

export const HERO_FORM_IMPORTS = [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CardComponent,
    InputComponent,
    MatCardActions,
    ButtonComponent
];

export const HERO_FORM = {
	Name: 'name',
	Power: 'power',
	Universe: 'universe',
    Age: 'age'
} as const satisfies Record<string, keyof HeroForm>;