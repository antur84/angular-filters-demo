import { Injectable, OnDestroy, OnInit, Provider, Type } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FilterOutputType, FiltersService } from './filters.service';

@Injectable()
export abstract class FilterComponent<TFilterComponentType extends FilterComponentType>
  implements FilterComponentConfig, OnInit, OnDestroy
{
  protected destroy$ = new Subject<void>();
  protected abstract ready$: () => Observable<FilterOutputType<TFilterComponentType>>;
  protected abstract filtersService: FiltersService;

  abstract key: string;
  abstract label: string;

  ngOnInit(): void {
    this.ready$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => this.filtersService.reportFilterAsReady(this.key, val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  emitFilterChange = (val: FilterOutputType<TFilterComponentType>) => {
    this.filtersService.reportFilterValueChanged(this.key, val);
  };
}
export const provideSelfAsFilterComponent = <T extends Type<FilterComponent<FilterComponentType>>>(
  val: T
): Provider => [
  {
    provide: FilterComponent,
    useExisting: val,
  },
];

export interface FilterComponentConfig {
  key: string;
  label: string;
}

export type FilterComponentType = 'query' | 'single';
