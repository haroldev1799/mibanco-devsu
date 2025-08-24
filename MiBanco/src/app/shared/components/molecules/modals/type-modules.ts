import { ComponentType } from "@angular/cdk/overlay";
import { ModalErrorComponent } from "./modal-error/modal-error.component";
import { ModalMessageRefComponent } from "./modal-message-ref/modal-message-ref.component";

export type ModalComponents = ComponentType<ModalErrorComponent> 
                    | ComponentType<ModalMessageRefComponent>;
