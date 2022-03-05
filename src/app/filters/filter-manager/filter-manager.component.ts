import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { map, startWith, Subject, takeUntil } from 'rxjs';
import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter-manager',
  templateUrl: './filter-manager.component.html',
  styleUrls: ['./filter-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterManagerComponent implements AfterContentInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ContentChildren(FilterComponent)
  filters: QueryList<FilterComponent>;

  constructor(private filtersService: FiltersService) {}

  ngAfterContentInit(): void {
    const filterKeys = () => this.filters.map((x) => x.key);
    this.filters.changes
      .pipe(
        map(() => filterKeys()),
        startWith(filterKeys()),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.filtersService.setCurrentFilterKeys(x));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
