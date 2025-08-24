export enum ButtonType {
	DARK = 'dark',
	LIGHT = 'light',
	PRIMARY = 'primary',
	LIGHT_DARK = 'light-dark',
	LINK = 'link',
}

export enum ButtonTypeComponent {
	BUTTON = 'button',
	SUBMIT = 'submit',
}

export interface ButtonData {
	img?: string;
	icon?: string;
	isIconMd?: boolean;
	style?: {
		width?: string;
		height?: string;
		fontSize?: string;
		minWidth?: string;
		borderRadius?: string;
		padding?: string;
		boxSizing?: string;
	};
}
