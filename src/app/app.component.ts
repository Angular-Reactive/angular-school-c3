import { Component, ViewChild, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { tap, switchMap } from 'rxjs/operators';
import { SearchboxComponent } from './searchbox/searchbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('search') searchBox: SearchboxComponent;
  public posts;
  constructor(private postsService:PostsService){}

  ngOnInit(): any {
    this.searchBox.value.pipe(
      switchMap(val => this.postsService.search(val))
    )
    .subscribe(data => this.posts = data);

  }

}
