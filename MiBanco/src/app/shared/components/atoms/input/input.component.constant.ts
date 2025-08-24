import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatError, MatInputModule } from "@angular/material/input";
import { NumberRangeDirective } from "@app/shared/directives/numberRange/numberRange.directive";
import { TrimInputDirective } from '@app/shared/directives/trimInput/trimInput.directive';
import { UppercaseDirective } from "@app/shared/directives/upperCase/upperCase.directive";

export const INPUT_FORM_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatError,
    TrimInputDirective,
    NumberRangeDirective,
    UppercaseDirective
];

