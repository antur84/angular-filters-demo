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

export const blogPostsFilterKeys = { query: 'bp-query', id: 'bp-id' };
