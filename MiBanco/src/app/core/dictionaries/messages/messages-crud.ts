import { ModalMessages } from "@app/core/interfaces/modal-message.interface";

export const MODAL_MESSAGES: ModalMessages = {
	modalConfirmSave: {
		title: 'Guardar registro',
		message: '¿Seguro que deseas guardar este registro?',
		buttonCancel: 'Cancelar',
		buttonAction: 'Guardar',
		icon: 'exclamation-circle'
	},
	modalConfirmSaveCancel: {
		title: 'Cancelar registro',
		message: '¿Seguro que deseas cancelar este registro?',
		buttonCancel: 'Cancelar',
		buttonAction: 'Confirmar',
		icon: 'exclamation-circle'
	},
	modalConfirmEdit: {
		title: 'Guardar cambios',
		message: '¿Estás seguro de guardar los cambios?',
		buttonCancel: 'Cancelar',
		buttonAction: 'Confirmar',
		icon: 'exclamation-circle'
	},
	modalConfirmEditCancel: {
		title: 'Cancelar cambios',
		message: '¿Seguro que deseas cancelar los cambios?',
		buttonCancel: 'Volver',
		buttonAction: 'Confirmar',
		icon: 'exclamation-circle'
	},
	modalDelete: {
		title: 'Eliminar registro',
		message: '¿Seguro que deseas eliminar este registro?',
		buttonCancel: 'Cancelar',
		buttonAction: 'Confirmar',
		icon: 'exclamation-circle'
	},
	modalDefault: {
		title: null,
		message: null,
		buttonCancel: 'Cancelar',
		buttonAction: 'Confirmar',
		icon: 'exclamation-circle'
	},
};
