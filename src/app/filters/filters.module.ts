import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSingleModule } from './filter-single/filter-single.module';
import { FilterQueryModule } from './filter-query/filter-query.module';
import { FilterManagerComponent } from './filter-manager/filter-manager.component';
import { FilterManagerModule } from './filter-manager/filter-manager.module';

const propagated = [FilterSingleModule, FilterQueryModule, FilterManagerModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...propagated],
  exports: [...propagated],
})
export class FiltersModule {}
