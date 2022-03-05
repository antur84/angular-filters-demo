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
export class FilterQueryComponent extends FilterComponent {
  @Input()
  key: string;
  @Input()
  label: string;

  query: string;
  constructor(filtersService: FiltersService) {
    super(filtersService);
  }

  ready$ = () => of(true);

  emitFilterChange = () => {
    this.filterService.reportFilterValueChanged(this.key, this.query);
  };
}
