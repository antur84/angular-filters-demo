import { NgModule } from '@angular/core';
import { FiltersModule } from '../filters/filters.module';
import { BlogPostsFiltersComponent } from './blog-posts-filters.component';

@NgModule({
  imports: [FiltersModule],
  declarations: [BlogPostsFiltersComponent],
  exports: [BlogPostsFiltersComponent],
})
export class BlogPostsFiltersModule {}
