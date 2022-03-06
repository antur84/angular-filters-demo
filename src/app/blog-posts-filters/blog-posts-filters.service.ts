import { FiltersConfiguration, FiltersService } from '../filters/filters.service';

export class BlogPostsFiltersService extends FiltersService<BlogPostsFilterModel> {
  config = blogPostsFiltersConfig;

  constructor() {
    super();
  }
}

export interface BlogPostsFilterModel {
  query?: string;
  id?: number;
}

export const blogPostsFiltersConfig: FiltersConfiguration<BlogPostsFilterModel> = {
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
    valueMapper: val => parseInt(val, 10),
  },
};
