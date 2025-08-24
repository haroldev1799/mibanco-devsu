import { AbstractControl } from '@angular/forms';

export const getErrorsMessage = (controlName: string = '', control: AbstractControl): Record<string, string> => {
	const errors = control.errors || {};
	const stringValid = controlName.endsWith('a') ? 'válida' : 'válido';

	const requiredLength = errors['minlength'] ? errors['minlength'].requiredLength : null;
	const maxLength = errors['maxlength'] ? errors['maxlength'].requiredLength : null;
	const min = errors['min'] ? errors['min'].min : null;
	const max = errors['max'] ? errors['max'].max : null;

	return {
		required: `${controlName} ${controlName !== '' ? 'es' : 'Es'} requerido`,
		email: `${controlName} no ${stringValid}`,
		minlength: requiredLength ? `Debe ser min. ${requiredLength} caracteres` : '',
		maxlength: maxLength ? `Debe ser max. ${maxLength} caracteres` : '',
		min: min ? `Min. valor es ${min}` : '',
		max: max ? `Max. valor es ${max}` : '',
		pattern: `${controlName} no ${stringValid}`,
		whitespace: `${controlName} no ${stringValid}`,
		passwordsMismatch: 'Las contraseñas no coinciden',
		invalidCode: 'Código no válido',
		dateInvalid: 'Fecha inválida',
		datePeriodMinor: 'Fecha inválida, debe ser menor a periodo',
		datePeriodMajor: 'Fecha inválida, debe ser mayor a periodo',
		minGreaterThanMax: 'Num. inválido',
		range: 'Fecha inválida'
	};
};
