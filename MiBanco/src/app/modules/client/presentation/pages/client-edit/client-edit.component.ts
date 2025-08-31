import { Component, inject, OnInit } from '@angular/core';
import { ClientFormComponent } from "../../components/client-form/client-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { CLIENT_ROUTE_NAMES_GLOBAL } from '@app/modules/client/client.routenames';
import { Client, DetailClientResponse } from '@app/modules/client/domain/dto/client.dto';

@Component({
  selector: 'app-client-edit',
  imports: [ClientFormComponent],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.sass'
})
export class ClientEditComponent implements OnInit {

  private clientId: string = '';
	private clientRepository = inject(ClientRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  title: string = 'Editar Héroe';
  client: Client | null = null;


  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') ?? '';
    this._getDetail();
  }


  editForm(event: any){
    this.clientRepository.update({
      ...event,
      id: this.clientId
    }).subscribe( {
      next:(res) => {
        console.log(res, ' res')
      },
      complete:() => this.router.navigate([`${CLIENT_ROUTE_NAMES_GLOBAL.LIST}`]),
      error:(e) => {
        console.log(e)
      }
    });
  }

  private _getDetail() {
    this.clientRepository.getById(this.clientId).subscribe({
      next:(result: DetailClientResponse | null) => {
        if(result)
          this.client = result?.data;
      },
      complete: () => {}
    });
  }
}
