export interface DataModalMessage {
	title?: string;
	message?: string;
	buttonText?: string;
	icon?: string;
	imgIcon?: string;
	widthImg?: number;
	urlRedirect?: string;
}

export type DataModalMessageRef = DataModalMessage & {
	buttonTextSecondary?: string;
	isClose?: boolean;
	classesButtons?: string;
};
