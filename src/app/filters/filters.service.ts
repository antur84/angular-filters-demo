import { Injectable, Provider, Type } from '@angular/core';

export const provideAsFiltersService = <T extends Type<FiltersService>>(
  val: T
): Provider => [
  val,
  {
    provide: FiltersService,
    useExisting: val,
  },
];

@Injectable()
export abstract class FiltersService {}
