import { OPTIONS_CODE } from "@app/core/enums/options.enum";
import { MenuData } from "@app/shared/components/atoms/menu/menu.interface";

export const optionsMenu: Record<string, MenuData> = {
	update: { label: 'Editar', value: OPTIONS_CODE.EDIT, disabled: false },
	delete: { label: 'Eliminar', value: OPTIONS_CODE.DELETE, disabled: false }
};
