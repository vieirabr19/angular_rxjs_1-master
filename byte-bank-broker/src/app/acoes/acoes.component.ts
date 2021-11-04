import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoesTodas$ = this.acoesService.getAcoes().pipe(tap(() => console.log('Flux inicial')));
  acoesFiltro$ = this.acoesInput.valueChanges.pipe(
    debounceTime(400),
    tap(() => console.log('Fluxo do filtro')),
    tap(console.log),
    filter((valor) => valor.length >= 3 || !valor.length),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.acoesService.getAcoes(valorDigitado)),
    tap(console.log),
  );

  acoes$ = merge(this.acoesTodas$, this.acoesFiltro$);

  constructor(private acoesService: AcoesService) {}
}
