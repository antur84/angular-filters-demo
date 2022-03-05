import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterQueryComponent } from './filter-query.component';

@NgModule({
  imports: [FormsModule],
  declarations: [FilterQueryComponent],
  exports: [FilterQueryComponent],
})
export class FilterQueryModule {}
