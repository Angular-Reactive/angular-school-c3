import { Component, ViewChild, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { tap, switchMap } from 'rxjs/operators';
import { SearchboxComponent } from './searchbox/searchbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// Before apply RxJS
/*
export class AppComponent {
  public posts;
  constructor(private postsService:PostsService){}

  public searchPosts(text) {
    this.postService.search(text)
    .subscribe(data => this.posts = data);

  }
}*/


// After apply RxJS
/**
 * "value" es un Observable que emite eventos, y esos eventos
 * son Observables con la request HTTP. Es decir, "value" es
 * un HOO.
 * Anteriormente, se hacia la suscripcion en la pagina HTML con
 * un event binding, pero es una sintaxis limitada de Angular.
 * Lo mejor que se puede hacer es llevar el "searchbox" de la pagina HTML
 * al lado TypeScript y utilizar switchMap.
 *
 * Para eso, en "app.component.html" declaro una "template reference" en
 * el component "<app-searchbox ...>" que se llamara "search" y asi eliminar
 * el binding (value)="searchPosts($event)".
 *
 * Ahora aqui, utilizamos el decorador "@ViewChild" para acceder a esa variable
 * que hace referencia al componente "<app-searchbox ...>".
 */
export class AppComponent implements OnInit {
  @ViewChild('search') searchBox: SearchboxComponent;
  public posts;
  constructor(private postsService:PostsService){}

  /**
   * En este metodo me subscribo al componente "<app-searchbox ...>"
   * referenciado per la ViewChild "searchBox" y antes, cuando recibia un valor,
   * utilizaba la funcion "searchPosts()" y me subscribia a los datos que recibia.
   * Ahora, utilizo "switchMap" y en cada valor que recibo hago la request HTTP.
   *
   * De esta manera, ya no es necesario subscribirse al Observable interno que era
   * representado por la funcion "searchPosts()", por lo que el codigo de la suscripcion
   * que hacia en esta funcion lo muevo al "subscribe()" del HOO (this.searchBox).
   *
   * Ahora, cada vez que recibo un valor, hago un "switchMap" de la request al servidor.
   */
  ngOnInit(): any {
    this.searchBox.value.pipe(
      switchMap(val => this.postsService.search(val))
    )
    .subscribe(data => this.posts = data);

  }

}
