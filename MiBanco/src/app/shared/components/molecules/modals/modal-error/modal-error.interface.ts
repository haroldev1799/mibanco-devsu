import { DataModalMessage } from '../modal-message-ref/modal-message-ref.interface';

export interface ModalErrorMessage {
	status: boolean;
	data: DataModalMessage | null;
}
