import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'app-filter-manager',
  templateUrl: './filter-manager.component.html',
  styleUrls: ['./filter-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterManagerComponent implements AfterContentInit {
  @ContentChildren(FilterComponent)
  filters: QueryList<FilterComponent>;

  constructor() {}

  ngAfterContentInit(): void {
    // this.filters are ready here
  }
}
