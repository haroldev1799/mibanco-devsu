import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailMovementResponse, Movement } from '@app/modules/movement/domain/dto/movement.dto';
import { MovementsRepository } from '@app/modules/movement/domain/repository/movement.repository';
import { MovementFormComponent } from "../../components/movement-form/movement-form.component";

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './movement-edit.component.html',
  styleUrl: './movement-edit.component.sass',
  imports: [MovementFormComponent]
})
export class MovementEditComponent {

  private heroId: string = '';
	private heroesRepository = inject(MovementsRepository);
  private route = inject(ActivatedRoute);
  
  title: string = 'Editar Héroe';
  movement: Movement | null = null;


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id') ?? '';
    this._getDetail();
  }


  private _getDetail() {
    this.heroesRepository.getById(this.heroId).subscribe({
      next:(result: DetailMovementResponse | null) => {
        if(result)
          this.movement = result.data;
      },
      complete: () => {

      }
    });
  }
}
