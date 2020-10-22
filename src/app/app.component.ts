import { Pokemon } from './pokemon.model';

import { PokemonService } from './pokemon.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pokemons: Pokemon[] = [];
  pokemonForm: FormGroup;

  constructor(
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder
  ) { }

  private buildForm() {
    this.pokemonForm = this.formBuilder.group({
      name: [null]
    });
  }

  private getAll() {
    this.pokemonService.getAll()
      .subscribe(
        (result) => {
          result.forEach(e => {
            this.pokemonService.getByNameOrId(e.name)
              .subscribe(
                result => this.pokemons.push(result)
              )
          })
        }
      );
  }

  ngOnInit() {
    this.buildForm();
    this.getAll();
  }

}
