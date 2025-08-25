import { Component, inject } from '@angular/core';
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";
import { HeroForm } from '@app/modules/heroes/domain/dto/heroes.dto';
import { HeroesRepository } from '@app/modules/heroes/domain/repository/heroes.repository';
import { Router } from '@angular/router';
import { HEROE_ROUTE_NAMES_GLOBAL } from '@app/modules/heroes/heroes.routenames';

@Component({
  selector: 'app-heroes-create',
  imports: [HeroFormComponent],
  templateUrl: './heroes-create.component.html',
  styleUrl: './heroes-create.component.sass'
})
export class HeroesCreateComponent {

	private heroesRepository = inject(HeroesRepository);
  private router = inject(Router);

  title: string = 'Registrar Héroe';

  saveForm(event: HeroForm){
    this.heroesRepository.create({
      ...event,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.router.navigate([`${HEROE_ROUTE_NAMES_GLOBAL.LIST}`]);
  }
}