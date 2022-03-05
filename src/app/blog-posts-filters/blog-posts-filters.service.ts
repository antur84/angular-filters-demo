import { Injectable } from '@angular/core';
import { FilterQueryOutputValueType } from '../filters/filter-query/filter-query.component';
import { FilterSingleOutputValueType } from '../filters/filter-single/filter-single.component';
import { FiltersConfiguration, FiltersService } from '../filters/filters.service';

@Injectable()
export class BlogPostsFiltersService extends FiltersService<BlogPostsFilterModel> {
  mapToFilterModel: (val: { key: string; value: any }[]) => BlogPostsFilterModel = val => {
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
    filterPropName: 'query',
    key: 'bp-query',
    label: 'Search',
    valueMapper: (val: FilterQueryOutputValueType) => val,
  },
  id: {
    filterPropName: 'id',
    key: 'bp-id',
    label: 'By Id',
    valueMapper: (val: FilterSingleOutputValueType) => parseInt(val, 10),
  },
};
