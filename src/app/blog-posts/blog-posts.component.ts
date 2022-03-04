import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogModel, DataService } from '../data.service';

@Component({
    selector: 'app-blog-posts',
    templateUrl: 'blog-posts.component.html',
    styleUrls: ['blog-posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostsComponent {
  blogPosts$ = this.dataService.getBlogPosts();
  constructor(private dataService: DataService) {}
  trackById = (_:number, post: BlogModel) => post.id;
}
