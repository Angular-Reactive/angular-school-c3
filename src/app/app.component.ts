import { Component, ViewChild } from '@angular/core';
import { PostsService } from './services/posts.service';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('search') searchBox:SearchboxComponent;
  public posts$;
  constructor(private postsService:PostsService){}

  // Before apply la pipe AsyncPipe
  /*
  ngOnInit(){
    this.searchBox.value
    .pipe( switchMap(val => this.postsService.search(val)));
    .subscribe(data => this.posts = data);
  }*/


/**
   * Al utilizar el pipe "asyncPipe" en la pagina HTML
   * del componente para el Observable "posts$", puedo quitar
   * la subscripcion que hago en el metodo ngOnInit.
   */
  ngOnInit(){
    this.posts$ = this.searchBox.value
    .pipe( switchMap(val => this.postsService.search(val)));
  }
}
