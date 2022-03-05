import { ChangeDetectionStrategy, Component } from '@angular/core';
import { blogPostsFiltersConfig } from './blog-posts-filters.service';

@Component({
  selector: 'app-blog-posts-filters',
  templateUrl: 'blog-posts-filters.component.html',
  styleUrls: ['blog-posts-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostsFiltersComponent {
  config = blogPostsFiltersConfig;
}
