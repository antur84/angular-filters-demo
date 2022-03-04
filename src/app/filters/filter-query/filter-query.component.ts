import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FilterComponent,
  provideSelfAsFilterComponent,
} from '../filter.component';

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
}
