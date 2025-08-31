import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MovementFormComponent } from "../../components/movement-form/movement-form.component";
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { MOVEMENT_ROUTE_NAMES_GLOBAL } from '@app/modules/movement/movement.routenames';
import { MovementForm } from '@app/modules/movement/domain/dto/movement.dto';
import { SELECT_TYPE, SELECT_TYPE_MOVEMENT } from '../../components/movement-form/movement-form.component.constant';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html',
  styleUrl: './movement-create.component.sass',
  imports: [MovementFormComponent]
})
export class MovementCreateComponent {

	private movementsRepository = inject(MovementsRepository);
  private router = inject(Router);

  title: string = 'Registrar Héroe';

  saveForm(event: MovementForm){
    if(event.transaction_type == SELECT_TYPE_MOVEMENT.RETIRO)
      event.amount = -Math.abs(event.amount);
    else
      event.amount = Math.abs(event.amount);
    
    this.movementsRepository.create({
      ...event
    }).subscribe({
      next: () => {
        this.router.navigate([`${MOVEMENT_ROUTE_NAMES_GLOBAL.LIST}`]);
      }
    });;
  }
}