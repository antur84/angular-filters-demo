import { Injectable } from '@angular/core';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class BlogPostsFiltersService extends FiltersService {
  constructor() {
    super();
  }
}

export interface BlogPostsFilterModel {
  query?: string;
  id?: number;
}

export const blogPostsFiltersConfig: Required<{
  [key in keyof BlogPostsFilterModel]: FilterComponentConfig;
}> = {
  query: { key: 'bp-query', label: 'Search' },
  id: { key: 'bp-id', label: 'By Id' },
};
