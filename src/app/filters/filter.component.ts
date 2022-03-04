import { Injectable, Input, Provider, Type } from '@angular/core';

@Injectable()
export abstract class FilterComponent {
  abstract key: string;
}
export const provideSelfAsFilterComponent = <T extends Type<FilterComponent>>(
  val: T
): Provider => [
  {
    provide: FilterComponent,
    useExisting: val,
  },
];
