import { Component, inject, OnInit } from '@angular/core';
import { ClientFormComponent } from "../../components/hero-form/client-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';

@Component({
  selector: 'app-client-edit',
  imports: [ClientFormComponent],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.sass'
})
export class ClientEditComponent implements OnInit {

  private heroId: string = '';
	private clientRepository = inject(ClientRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  title: string = 'Editar Héroe';
  hero: any | null = null;


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id') ?? '';
    this._getDetail();
  }


  editForm(event: any){
    this.clientRepository.update({
      ...event,
      id: this.heroId,
      updatedAt: Date.now(),
    });
    this.router.navigate([`${CLIENT_ROUTE_NAMES_GLOBAL.LIST}`]);
  }

  private _getDetail() {
    this.clientRepository.getById(this.heroId).subscribe({
      next:(result: any | null) => {
        if(result)
          this.hero = result.data;
      },
      complete: () => {

      }
    });
  }
}
