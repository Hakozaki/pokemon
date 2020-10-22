import { Pokemon } from './pokemon.model';

import { PokemonService } from './pokemon.service';
import { Component, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //PAGINATION
  collectionSize;
  pageSize = 5;
  page = 1;


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
                result => {
                  this.pokemons.push(result);
                  this.collectionSize = this.pokemons.length;
                }
              )
          })
        }
      );
  }

  /**
   * Faz a fuiltragem no array de pokemons
   * @param text 
   */
  search(text: string) {
    this.pokemons = this.pokemons.filter(pokemon => {
      const term = text.toLowerCase();
      return pokemon.name.toLowerCase().includes(term);
    });
  }

  /**
   * Rotina do botão pesquisar da tabela
   */
  pesquisar() {
    this.search(this.pokemonForm.controls['name'].value)
  }

  ngOnInit() {
    this.buildForm();
    this.getAll();
  }

}
