import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterOutput } from './filters.service';

@Injectable()
export class FilterStorageService<T extends FilterOutput> {
  save = (key: string, val: T): Observable<T> => {
    localStorage.setItem(key, JSON.stringify(this.wrap(val)));
    return of(val);
  };

  load = (key: string): Observable<T> => {
    const val = localStorage.getItem(key);
    if (!val) {
      return of(null);
    }

    var { data, version } = JSON.parse(val) as Data<T>;
    if (version !== '0.1') {
      return of(null);
    }
    return of(data);
  };

  private wrap = (val: T): Data<T> => ({ data: val, version: '0.1' });
}

interface Data<T> {
  data: T;
  version: '0.1';
}
