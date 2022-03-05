import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FilterComponent,
  provideSelfAsFilterComponent,
} from '../filter.component';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter-single',
  templateUrl: 'filter-single.component.html',
  styleUrls: ['filter-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideSelfAsFilterComponent(FilterSingleComponent)],
})
export class FilterSingleComponent extends FilterComponent {
  @Input()
  key: string;
  @Input()
  label: string;
  constructor(private filtersService: FiltersService) {
    super();
  }
}
