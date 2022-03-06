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
import { FilterQueryOutputValueType } from './filter-query/filter-query.component';
import { FilterSingleOutputValueType } from './filter-single/filter-single.component';
import { FilterStorageService } from './filter-storage.service';
import { FilterComponentConfig, FilterComponentType } from './filter.component';
@Injectable()
export abstract class FiltersService<TFilterModel extends {} = {}> implements OnDestroy {
  private filterKeys: string[] = [];
  private filterKeys$ = new ReplaySubject<typeof this.filterKeys>(1);
  private filterStatus = new Map<string, FilterStatus>();
  private filterStatus$ = new ReplaySubject<typeof this.filterStatus>(1);

  private filtersReady$ = combineLatest([this.filterStatus$, this.filterKeys$]).pipe(
    filter(([status, keys]) => keys.every(fk => status.get(fk)?.status === 'ready')),
    map(([_, keys]) => keys.join()),
    distinctUntilChanged(),
    mapTo(true),
    tap(x => console.log('all ready', x))
  );

  private mapToFilterModel: (val: { key: string; value: FilterOutput }[]) => TFilterModel = val => {
    const filterConfigs = Object.values(
      this.config
    ) as FiltersConfiguration<TFilterModel>[keyof TFilterModel][];
    return val.reduce((prev, curr) => {
      const cfg = filterConfigs.find(filterConfig => filterConfig.key === curr.key);
      if (!cfg) {
        return prev;
      }
      const filterPropName = cfg.filterPropName;
      return {
        ...prev,
        [filterPropName]: this.config[filterPropName].valueMapper(curr.value),
      };
    }, {} as TFilterModel);
  };

  abstract config: FiltersConfiguration<TFilterModel>;

  filtersChanged$ = this.filtersReady$.pipe(
    switchMap(() => this.filterStatus$),
    map(x => Array.from(x.entries())),
    map(x => x.map(([key, { value }]) => ({ key, value: value || null }))),
    map(x => this.mapToFilterModel(x))
  );

  ngOnDestroy(): void {
    this.filterStatus$.complete();
    this.filterKeys$.complete();
  }

  setFilterKeys = (keys: string[]): void => {
    this.filterKeys = keys;
    this.filterKeys$.next(this.filterKeys);
  };

  reportFilterAsReady = (key: string, value: FilterOutput) => {
    this.filterStatus.set(key, {
      status: 'ready',
      value,
    });
    this.emitFilterStatusChanged();
  };

  reportFilterValueChanged = (key: string, value: FilterOutput) => {
    const current = this.filterStatus.get(key);
    if (!current) {
      return;
    }
    const updated = { ...current, value };
    this.filterStatus.set(key, updated);
    this.emitFilterStatusChanged();
  };

  private emitFilterStatusChanged = () => {
    this.filterStatus$.next(this.filterStatus);
  };
}

export const provideAsFiltersService = <T extends Type<FiltersService>>(val: T): Provider => [
  val,
  {
    provide: FiltersService,
    useExisting: val,
  },
  FilterStorageService,
];

interface FilterStatus {
  status: 'ready';
  value?: FilterOutput;
}

export type FilterOutputType<TFilterType extends FilterComponentType> = TFilterType extends 'query'
  ? FilterQueryOutputValueType
  : TFilterType extends 'single'
  ? FilterSingleOutputValueType
  : never;

type ValueMapper<TSourceType extends FilterOutput, TTargetType> = (
  val: TSourceType
) => TTargetType | null;

export type FilterOutput = FilterOutputType<FilterComponentType>;
export type FiltersConfiguration<TFilterModel> = Required<{
  [key in keyof TFilterModel]: FilterComponentConfig & {
    key: string;
    valueMapper: ValueMapper<FilterOutput, TFilterModel[key]>;
    filterPropName: key;
    type: FilterComponentType;
  };
}>;
