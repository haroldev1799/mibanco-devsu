import { FormsModule } from '@angular/forms';
import { CardComponent } from "@app/shared/components/atoms/card/card.component";
import { InputComponent } from '@app/shared/components/atoms/input/input.component';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";

export const CLIENT_FORM_IMPORTS = [
    FormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent
];

export const CLIENT_FORM = {
	Name: 'name',
	Gender: 'gender',
	Age: 'age',
	Identification: 'identification',
    Addres: 'address',
    Phone: 'phone',
    Password: 'password',
    Status: 'status',
} as const satisfies Record<string, keyof any>;