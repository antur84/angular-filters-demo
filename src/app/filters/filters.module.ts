import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterManagerModule } from './filter-manager/filter-manager.module';
import { FilterQueryModule } from './filter-query/filter-query.module';
import { FilterSingleModule } from './filter-single/filter-single.module';

const propagated = [FilterSingleModule, FilterQueryModule, FilterManagerModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...propagated],
  exports: [...propagated],
})
export class FiltersModule {}
