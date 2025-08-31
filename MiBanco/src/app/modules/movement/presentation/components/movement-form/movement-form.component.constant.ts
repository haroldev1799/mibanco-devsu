import { FormsModule } from '@angular/forms';
import { CardComponent } from "@app/shared/components/atoms/card/card.component";
import { InputComponent } from '@app/shared/components/atoms/input/input.component';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { MovementForm } from '@app/modules/movement/domain/dto/movement.dto';
import { IOptionSelect } from '@app/shared/components/atoms/select/select.interface';

export const MOVEMENT_FORM_IMPORTS = [
    FormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent
];

export const MOVEMENT_FORM = {
	TransactionType: 'transaction_type',
	Amount: 'amount',
    AccountId: 'account_id'
} as const satisfies Record<string, keyof MovementForm>;

export const SELECT_TYPE: IOptionSelect[] = [
    {
        name: 'RETIRO',
        value: 'RETIRO'
    },
    {
        name: 'INGRESO',
        value: 'INGRESO'
    }
];

export enum SELECT_TYPE_MOVEMENT {
    RETIRO = "RETIRO",
    INGRESO = "INGRESO"
}
