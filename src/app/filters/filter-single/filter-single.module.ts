import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterSingleComponent } from './filter-single.component';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [FilterSingleComponent],
  exports: [FilterSingleComponent],
})
export class FilterSingleModule {}
