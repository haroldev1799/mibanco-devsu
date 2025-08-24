import { Component, inject, OnInit } from '@angular/core';
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";
import { DetailHeroResponse, Hero, HeroForm } from '@app/modules/heroes/domain/dto/heroes.dto';
import { HeroesRepository } from '@app/modules/heroes/domain/repository/heroes.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { HEROE_ROUTE_NAMES_GLOBAL } from '@app/modules/heroes/heroes.routenames';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@app/shared/components/atoms/snackbar/snackbar.component';

@Component({
  selector: 'app-heroes-edit',
  imports: [HeroFormComponent],
  templateUrl: './heroes-edit.component.html',
  styleUrl: './heroes-edit.component.sass'
})
export class HeroesEditComponent implements OnInit {

  private heroId: string = '';
	private heroesRepository = inject(HeroesRepository);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  
  title: string = 'Editar Héroe';
  hero: HeroForm | null = null;


  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id') ?? '';
    this._getDetail();
  }


  editForm(event: HeroForm){
    this.heroesRepository.update({
      ...event,
      id: this.heroId,
      updatedAt: Date.now(),
    });
    this.router.navigate([`${HEROE_ROUTE_NAMES_GLOBAL.LIST}`]);
  }

  private _getDetail() {
    this.heroesRepository.getById(this.heroId).subscribe({
      next:(result: DetailHeroResponse | null) => {
        if(result)
          this.hero = result.data;
        else
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'No se encontró la héroe.'}
          });
      },
      complete: () => {

      }
    });
  }
}
