import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(value?: any, filter?: any, defaultFilter?: any): any {
    if (!filter) {
      return value;
    }

    if (!Array.isArray(value)) {
      return value;
    }

    if (filter && Array.isArray(value)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return value.filter(item => {
          filterKeys.reduce(
            (x, keyName) => (x && RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == '',
            true
          );
        });
      } else {
        return value.filter(item => {
          return filterKeys.some(keyName => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == '';
          });
        });
      }
    }
  }
}