import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoesTodas$ = this.acoesService.getAcoes().pipe(tap(() => console.log('Valor inicial')));
  acoesFiltro$ = this.acoesInput.valueChanges.pipe(
    tap(() => console.log('Valor do filtro')),
    switchMap(valorDigitado => this.acoesService.getAcoes(valorDigitado))
  )

  acoes$ = merge(this.acoesTodas$, this.acoesFiltro$);

  constructor(private acoesService: AcoesService) {}
}
