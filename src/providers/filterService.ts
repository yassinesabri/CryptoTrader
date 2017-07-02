import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FilterService {
  filterCurrencies(currencies, searchQuery: string) {
    return currencies.filter((item) => {
      return item.toLowerCase().startsWith(searchQuery.toLowerCase());
    });
  }
}