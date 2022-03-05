import { Injectable, OnDestroy, Provider, Type } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
@Injectable()
export abstract class FiltersService<TFilterModel = unknown> implements OnDestroy {
  private filterKeys: string[] = [];
  private filterKeys$ = new ReplaySubject<typeof this.filterKeys>(1);
  private filterStatus = new Map<string, FilterStatus>();
  private filterStatus$ = new ReplaySubject<typeof this.filterStatus>(1);

  abstract mapToFilterModel: (val: { key: string; value: any }[]) => TFilterModel;

  setFilterKeys = (keys: string[]): void => {
    this.filterKeys = keys;
    this.filterKeys$.next(this.filterKeys);
  };

  reportFilterAsReady = (key: string) => {
    this.filterStatus.set(key, {
      status: 'ready',
    });
    this.emitFilterStatusChanged();
  };

  reportFilterValueChanged = (key: string, value: any) => {
    const current = this.filterStatus.get(key);
    if (!current) {
      return;
    }
    const updated = { ...current, value };
    this.filterStatus.set(key, updated);
    this.emitFilterStatusChanged();
  };

  filtersReady$ = combineLatest([this.filterStatus$, this.filterKeys$]).pipe(
    filter(([status, keys]) => keys.every(fk => status.get(fk)?.status === 'ready')),
    map(([_, keys]) => keys.join()),
    distinctUntilChanged(),
    mapTo(true),
    tap(x => console.log('all ready', x))
  );

  filtersChanged$ = this.filtersReady$.pipe(
    switchMap(() => this.filterStatus$),
    map(x => Array.from(x.entries())),
    map(x => x.map(([key, { value }]) => ({ key, value }))),
    map(x => this.mapToFilterModel(x))
  );

  private emitFilterStatusChanged() {
    this.filterStatus$.next(this.filterStatus);
  }

  ngOnDestroy(): void {
    this.filterStatus$.complete();
    this.filterKeys$.complete();
  }
}

export const provideAsFiltersService = <T extends Type<FiltersService>>(val: T): Provider => [
  val,
  {
    provide: FiltersService,
    useExisting: val,
  },
];

interface FilterStatus {
  status: 'ready';
  value?: any;
}
