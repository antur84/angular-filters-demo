import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSingleModule } from './filter-single/filter-single.module';
import { FilterQueryModule } from './filter-query/filter-query.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FilterSingleModule, FilterQueryModule],
  exports: [FilterSingleModule, FilterQueryModule],
})
export class FiltersModule {}
