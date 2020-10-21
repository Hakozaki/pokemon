import { Pokemon } from './pokemon.model';

import { PokemonService } from './pokemon.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
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

  botao() {
    console.log('pokemons', this.pokemons)
  }
}
