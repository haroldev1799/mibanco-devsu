import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-modal-error',
	 imports: [
	 ],
	templateUrl: './modal-error.component.html',
	styleUrl: './modal-error.component.sass',
})
export class ModalErrorComponent {
	private router = inject(Router);
	data!: any;

	isOpen = false;


	clickBtnAction() {
		if (this.data?.urlRedirect) {
			this.router.navigateByUrl(this.data?.urlRedirect);
		}
	}
}
