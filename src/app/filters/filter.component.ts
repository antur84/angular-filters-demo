import { Injectable, OnDestroy, OnInit, Provider, Type } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FiltersService } from './filters.service';

@Injectable()
export abstract class FilterComponent
  implements FilterComponentConfig, OnInit, OnDestroy
{
  protected destroy$ = new Subject<void>();
  protected abstract ready$: () => Observable<boolean>;
  abstract key: string;
  abstract label: string;

  constructor(protected filterService: FiltersService) {}

  ngOnInit(): void {
    this.ready$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.filterService.reportFilterAsReady(this.key));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
export const provideSelfAsFilterComponent = <T extends Type<FilterComponent>>(
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
