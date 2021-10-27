import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(){
    return this.http.get<any>('http://localhost:3000/acoes');
  }

}
