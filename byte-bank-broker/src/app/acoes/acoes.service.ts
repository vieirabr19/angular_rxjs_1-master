import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from "rxjs/operators";
import { Acao, AcoesApi } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.http.get<AcoesApi>('http://localhost:3000/acoes', { params }).pipe(
      tap(valor => console.log('VALOR DA API',valor)),
      pluck('payload'),
      map(acoes => acoes.sort((acaoA, acaoB) => this.ordenarPorCodigo(acaoA, acaoB)))
    )
  }

  private ordenarPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo){
      return 1;
    }
    if(acaoA.codigo < acaoB.codigo){
      return -1
    }
    return 0;
  }

}
