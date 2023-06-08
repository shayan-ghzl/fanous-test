import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {

  transform(value: any[] | null, predicate: string): any[] | null {
    if(value){
      return this.uniqBy(value, predicate);
    }
    return value;
  }
  
  uniqBy(arr: any[], predicate: string) {
    if (!Array.isArray(arr)) { return []; }
    
    const pickedObjects = arr
      .reduce((map, item: any) => {
          const key = (<any>item)[predicate];
          if (!key) { return map; }
          return map.has(key) ? map : map.set(key, item);
      }, new Map<string, any>())
      .values();
   
    return [...pickedObjects];
  }
  
}
