import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { take, tap } from 'rxjs';
import { FilterStorageService } from '../filter-storage.service';
import { FilterComponent, provideSelfAsFilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter-query',
  templateUrl: 'filter-query.component.html',
  styleUrls: ['filter-query.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideSelfAsFilterComponent(FilterQueryComponent)],
})
export class FilterQueryComponent extends FilterComponent<'query'> {
  @Input()
  key: string;
  @Input()
  label: string;

  query: FilterQueryOutputValueType;

  constructor(
    private filterStorageService: FilterStorageService<FilterQueryOutputValueType>,
    protected filtersService: FiltersService
  ) {
    super();
  }

  saveAndEmitFilterChange = (val: FilterQueryOutputValueType) => {
    this.filterStorageService.save(this.key, val).pipe(take(1)).subscribe();
    this.emitFilterChange(val);
  };

  ready$ = () => this.filterStorageService.load(this.key).pipe(tap(val => (this.query = val)));
}

export type FilterQueryOutputValueType = string | null;
