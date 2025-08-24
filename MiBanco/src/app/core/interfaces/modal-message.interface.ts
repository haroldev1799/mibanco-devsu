export interface ModalMessage {
	title: string | null;
	message?: string | null;
	buttonCancel?: string | null;
	buttonAction?: string;
	icon?: string;
	urlRedirect?: string;
}

export interface ModalMessages {
	modalConfirmSave: ModalMessage;
	modalConfirmSaveCancel: ModalMessage;
	modalConfirmEdit: ModalMessage;
	modalConfirmEditCancel: ModalMessage;
	modalDelete: ModalMessage;
    modalDefault: ModalMessage;
}
