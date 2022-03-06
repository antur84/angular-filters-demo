import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogModel, BlogPostsService } from './blog-posts.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: 'blog-posts.component.html',
  styleUrls: ['blog-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogPostsService],
})
export class BlogPostsComponent {
  blogPosts$ = this.blogPostsService.filteredBlogPosts$;

  constructor(private blogPostsService: BlogPostsService) {}

  trackById = (_: number, post: BlogModel) => post.id;
}
