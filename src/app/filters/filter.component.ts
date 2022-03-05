import { Injectable, OnDestroy, Provider, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class FilterComponent
  implements FilterComponentConfig, OnDestroy
{
  protected destroy$ = new Subject<void>();
  abstract key: string;
  abstract label: string;

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
