import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientFormComponent } from '../../components/hero-form/client-form.component';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';

@Component({
  selector: 'app-client-create',
  imports: [ClientFormComponent],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.sass'
})
export class ClientCreateComponent {

	private heroesRepository = inject(ClientRepository);
  private router = inject(Router);

  title: string = 'Registrar Héroe';

  saveForm(event: any){
    this.heroesRepository.create({
      ...event,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.router.navigate([`${CLIENT_ROUTE_NAMES_GLOBAL.LIST}`]);
  }
}