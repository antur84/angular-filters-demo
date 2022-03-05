import { Injectable } from '@angular/core';
import { FilterComponentConfig } from '../filters/filter.component';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class BlogPostsFiltersService extends FiltersService<BlogPostsFilterModel> {
  mapToFilterModel: (val: { key: string; value: any }[]) => BlogPostsFilterModel = val => {
    const filterConfigs = Object.entries(blogPostsFiltersConfig);
    return val.reduce((prev, curr) => {
      const config = filterConfigs.find(([_, filterConfig]) => filterConfig.key === curr.key);
      if (!config) {
        return prev;
      }
      const [propertyName] = config;
      return { ...prev, [propertyName]: curr.value };
    }, {});
  };

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
