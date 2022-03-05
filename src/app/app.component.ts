import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPostsFiltersService } from './blog-posts-filters/blog-posts-filters.service';
import { provideAsFiltersService } from './filters/filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideAsFiltersService(BlogPostsFiltersService)],
})
export class AppComponent {}
