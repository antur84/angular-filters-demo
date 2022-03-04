import { Component } from '@angular/core';
import { BlogModel, DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  blogPosts$ = this.dataService.getBlogPosts();
  constructor(private dataService: DataService) {}
  trackById = (_:number, post: BlogModel) => post.id;
}
