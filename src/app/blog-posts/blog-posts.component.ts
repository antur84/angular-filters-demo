import { ChangeDetectionStrategy, Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { BlogPostsFiltersService } from '../blog-posts-filters/blog-posts-filters.service';
import { BlogModel, DataService } from '../data.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: 'blog-posts.component.html',
  styleUrls: ['blog-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostsComponent {
  blogPosts$ = this.blogPostsFiltersService.filtersReady$.pipe(
    switchMap(() => this.dataService.getBlogPosts())
  );
  constructor(
    private dataService: DataService,
    private blogPostsFiltersService: BlogPostsFiltersService
  ) {}
  trackById = (_: number, post: BlogModel) => post.id;
}
