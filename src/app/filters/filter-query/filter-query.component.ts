import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { of } from 'rxjs';
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

  constructor(filtersService: FiltersService) {
    super(filtersService);
  }

  ready$ = () => of(true);
}

export type FilterQueryOutputValueType = string;
