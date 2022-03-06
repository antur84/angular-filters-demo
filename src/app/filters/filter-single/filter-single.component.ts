import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { take, tap } from 'rxjs';
import { FilterStorageService } from '../filter-storage.service';
import { FilterComponent, provideSelfAsFilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter-single',
  templateUrl: 'filter-single.component.html',
  styleUrls: ['filter-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideSelfAsFilterComponent(FilterSingleComponent)],
})
export class FilterSingleComponent extends FilterComponent<'single'> {
  @Input()
  key: string;
  @Input()
  label: string;

  selectedId: FilterSingleOutputValueType;

  constructor(
    private filterStorageService: FilterStorageService<FilterSingleOutputValueType>,
    protected filtersService: FiltersService
  ) {
    super();
  }

  saveAndEmitFilterChange = (val: FilterSingleOutputValueType) => {
    this.filterStorageService.save(this.key, val).pipe(take(1)).subscribe();
    this.emitFilterChange(val);
  };

  ready$ = () => this.filterStorageService.load(this.key).pipe(tap(val => (this.selectedId = val)));
}
/**
 * In runtime, the value is a string, even if you bind to numbers
 */
export type FilterSingleOutputValueType = string | null;
