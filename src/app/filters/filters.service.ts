import { Injectable, OnDestroy, Provider, Type } from '@angular/core';
import {
  combineLatest,
  filter,
  mapTo,
  OperatorFunction,
  ReplaySubject,
} from 'rxjs';
@Injectable()
export abstract class FiltersService<TFilterModel = unknown>
  implements OnDestroy
{
  private filterKeys: string[] = [];
  private filterKeys$ = new ReplaySubject<typeof this.filterKeys>(1);
  private filterStatus = new Map<string, { status: 'ready' }>();
  private filterStatus$ = new ReplaySubject<typeof this.filterStatus>(1);

  abstract mapToFilterModel: OperatorFunction<
    { key: string; value: any }[],
    TFilterModel
  >;

  setFilterKeys = (keys: string[]): void => {
    this.filterKeys = keys;
    this.filterKeys$.next(this.filterKeys);
  };

  reportFilterAsReady = (key: string) => {
    this.filterStatus.set(key, {
      status: 'ready',
    });
    this.filterStatus$.next(this.filterStatus);
  };

  filtersReady$ = combineLatest([this.filterStatus$, this.filterKeys$]).pipe(
    filter(([status, keys]) =>
      keys.every((fk) => status.get(fk)?.status === 'ready')
    ),
    mapTo(true)
  );

  ngOnDestroy(): void {
    this.filterStatus$.complete();
    this.filterKeys$.complete();
  }
}

export const provideAsFiltersService = <T extends Type<FiltersService>>(
  val: T
): Provider => [
  val,
  {
    provide: FiltersService,
    useExisting: val,
  },
];
