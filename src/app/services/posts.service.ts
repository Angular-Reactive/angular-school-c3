import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, ) { }

  /**
   * Este metodo retorna el resultado de la request HTTP
   * del client HttpClient de Angular.
   * Las funciones de la clase HttpClient de Angular devuelven
   * Observables.
   * @param search
   *
   */
  search(search: any){
    return this.http.get(`http://localhost:3000/posts?q=${search}`);
  }
}
