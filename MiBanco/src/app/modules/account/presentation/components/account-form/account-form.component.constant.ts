import { FormsModule } from '@angular/forms';
import { CardComponent } from "@app/shared/components/atoms/card/card.component";
import { InputComponent } from '@app/shared/components/atoms/input/input.component';
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { AccountForm } from '@app/modules/account/domain/dto/account.dto';
import { SelectComponent } from '@app/shared/components/atoms/select/select.component';
import { IOptionSelect } from '@app/shared/components/atoms/select/select.interface';

export const ACCOUNT_FORM_IMPORTS = [
    FormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent
];

export const ACCOUNT_FORM = {
    account_number: 'account_number',
    type: 'type',
    initial_balance: 'initial_balance',
    status: 'status',
    client_id: 'client_id',
    daily_limit_amount: 'daily_limit_amount'
} as const satisfies Record<string, keyof AccountForm>;

export const SELECT_TYPE: IOptionSelect[] = [
    {
        name: 'CORRIENTE',
        value: 'CORRIENTE'
    },
    {
        name: 'AHORRO',
        value: 'AHORRO'
    }
];