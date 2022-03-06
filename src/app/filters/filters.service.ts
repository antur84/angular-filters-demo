import { Injectable, OnDestroy, Provider, Type } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';
import {
  FilterQueryInputOptionsType,
  FilterQueryOutputValueType,
} from './filter-query/filter-query.component';
import {
  FilterSingleInputOptionsType,
  FilterSingleOutputValueType,
} from './filter-single/filter-single.component';
import { FilterStorageService } from './filter-storage.service';
import { FilterComponentConfig, FilterComponentType } from './filter.component';
@Injectable()
export abstract class FiltersService<TFilterModel extends {} = {}> implements OnDestroy {
  private filterKeys: string[] = [];
  private filterKeys$ = new ReplaySubject<typeof this.filterKeys>(1);
  private filterInputOptions = new Map<string, FilterInputOptions>();
  private filterInputOptionsSubject = new ReplaySubject<typeof this.filterInputOptions>(1);
  private filterStatus = new Map<string, FilterStatus>();
  private filterStatus$ = new ReplaySubject<typeof this.filterStatus>(1);
  private filtersReady$ = combineLatest([this.filterStatus$, this.filterKeys$]).pipe(
    filter(([status, keys]) => keys.every(fk => status.get(fk)?.status === 'ready')),
    map(([_, keys]) => keys.join()),
    distinctUntilChanged(),
    mapTo(true)
  );
  protected destroy$ = new Subject<void>();

  abstract config: FiltersConfiguration<TFilterModel, DesiredFilterTypePerProperty<TFilterModel>>;

  filtersChanged$ = this.filtersReady$.pipe(
    switchMap(() => this.filterStatus$),
    map(x => Array.from(x.entries())),
    map(x => x.map(([key, { value }]) => ({ key, value: value || null }))),
    map(x => this.mapToFilterModel(x))
  );

  filterInputOptions$ = <T extends FilterInputOptions>(key: string): Observable<T> =>
    this.filterInputOptionsSubject.pipe(
      map(options => options.get(key)),
      filter(optionsForKey => !!optionsForKey),
      map(x => x as T)
    );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  setFilterOptions = <
    TFilterConfig extends typeof this.config[keyof TFilterModel],
    TFilterOptions extends FilterInputOptionsType<TFilterConfig['type']>
  >(
    filterConfig: TFilterConfig,
    options: TFilterOptions
  ) => {
    this.filterInputOptions.set(filterConfig.key, options);
    this.filterInputOptionsSubject.next(this.filterInputOptions);
  };

  private emitFilterStatusChanged = () => {
    this.filterStatus$.next(this.filterStatus);
  };

  private mapToFilterModel: (val: { key: string; value: FilterOutput }[]) => TFilterModel = val => {
    const filterConfigs = Object.values(this.config) as typeof this.config[keyof TFilterModel][];
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
export type FilterInputOptionsType<TFilterType extends FilterComponentType> =
  TFilterType extends 'single'
    ? FilterSingleInputOptionsType
    : TFilterType extends 'query'
    ? FilterQueryInputOptionsType
    : never;
export type FilterOutputType<TFilterType extends FilterComponentType> = TFilterType extends 'query'
  ? FilterQueryOutputValueType
  : TFilterType extends 'single'
  ? FilterSingleOutputValueType
  : never;

type ValueMapper<TSourceType extends FilterOutput, TTargetType> = (
  val: TSourceType
) => TTargetType | null;

export type FilterInputOptions = FilterInputOptionsType<FilterComponentType>;
export type FilterOutput = FilterOutputType<FilterComponentType>;
export type DesiredFilterTypePerProperty<T> = {
  [key in keyof T]: FilterComponentType;
};
export type FiltersConfiguration<
  TFilterModel,
  TDesiredFilterType extends DesiredFilterTypePerProperty<TFilterModel>
> = Required<{
  [key in keyof TFilterModel]: FilterComponentConfig & {
    key: string;
    valueMapper: ValueMapper<FilterOutput, TFilterModel[key]>;
    filterPropName: key;
    type: TDesiredFilterType[key];
  };
}>;
