import { Injectable, Provider, Type } from '@angular/core';
import { OperatorFunction } from 'rxjs';
@Injectable()
export abstract class FiltersService<TFilterModel = unknown> {
  abstract mapToFilterModel: OperatorFunction<
    { key: string; value: any }[],
    TFilterModel
  >;
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
