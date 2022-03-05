import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { delay, of } from 'rxjs';
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

  constructor(filtersService: FiltersService) {
    super(filtersService);
  }

  ready$ = () => of().pipe(delay(2000));
}
