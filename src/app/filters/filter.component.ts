import { Injectable, OnDestroy, Provider, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class FilterComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();
  abstract key: string;

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
