import { Injectable } from '@angular/core';
import { filter, map, switchMap, take, takeUntil } from 'rxjs';
import { BlogPostsQuery } from '../blog-posts/blog-posts.query';
import { FiltersConfiguration, FiltersService } from '../filters/filters.service';

@Injectable()
export class BlogPostsFiltersService extends FiltersService<BlogPostsFilterModel> {
  config = blogPostsFiltersConfig;

  constructor(private blogPostsQuery: BlogPostsQuery) {
    super();
    this.setFilterOptionsBasedOnBlogPosts();
  }

  private setFilterOptionsBasedOnBlogPosts = () => {
    this.blogPostsQuery.isPopulated$
      .pipe(
        filter(isPopulated => isPopulated),
        switchMap(() => this.blogPostsQuery.selectAll()),
        map(all => all.map(x => x.id)),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(blogIds => {
        this.setFilterOptions(
          this.config.id,
          blogIds.map(x => ({ value: x, text: `${x}` }))
        );
      });
  };
}

export interface BlogPostsFilterModel {
  query?: string;
  id?: number;
}

export const blogPostsFiltersConfig: FiltersConfiguration<
  BlogPostsFilterModel,
  {
    id: 'single';
    query: 'query';
  }
> = {
  query: {
    type: 'query',
    filterPropName: 'query',
    key: 'bp-query',
    label: 'Search',
    valueMapper: val => val,
  },
  id: {
    type: 'single',
    filterPropName: 'id',
    key: 'bp-id',
    label: 'By Id',
    valueMapper: val => (typeof val === 'string' ? parseInt(val, 10) : null),
  },
};
