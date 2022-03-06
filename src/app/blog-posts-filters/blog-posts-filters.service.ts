import { Injectable } from '@angular/core';
import { FilterOutput, FiltersConfiguration, FiltersService } from '../filters/filters.service';

@Injectable()
export class BlogPostsFiltersService extends FiltersService<BlogPostsFilterModel> {
  mapToFilterModel: (val: { key: string; value: FilterOutput }[]) => BlogPostsFilterModel = val => {
    const filterConfigs = Object.values(blogPostsFiltersConfig);
    return val.reduce((prev, curr) => {
      const config = filterConfigs.find(filterConfig => filterConfig.key === curr.key);
      if (!config) {
        return prev;
      }
      const filterPropName = config.filterPropName;
      return {
        ...prev,
        [filterPropName]: blogPostsFiltersConfig[filterPropName].valueMapper(curr.value),
      };
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
