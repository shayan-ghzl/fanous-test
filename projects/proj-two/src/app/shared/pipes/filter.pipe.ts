import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any[] | null, inputVal: string, fields: string[], ascendant: 1 | -1 | null): any[] | null {
    if(value){

      return this.search(inputVal, value, fields, ascendant);
    }
    return value;
  }

  search(value: string, list: any[], fields: string[], ascendant: 1 | -1 | null){
    const keyword = value.trim().toLowerCase();
    let temp: any[] = [];
    temp = list.filter(x => this.searchInFields(x, fields).includes(keyword));

    
  temp = this.hierarchy([...temp]);
 
    
    if (ascendant) {
      temp.sort((a: any, b: any) => {
        if ( a.name < b.name ){
          return -1 * ascendant;
        }
        if ( a.name > b.name ){
          return 1 * ascendant;
        }
        return 0;
      });
    }
    return temp;
  }

  searchInFields(model: any, fields: string[]){
    const temp: string[] = [];
    fields.forEach((field) => {
      temp.push(model[field].toString().trim().toLowerCase());
    });
    return temp.join(' ');
  }


   hierarchy(arr: any[]){
    const map: any = {};
    let root = [];
    for (const ele of arr) {
      map[ele.id] = ele;
      ele.children = [];
    }
    for (let index = 0; index < arr.length; index++) {
      if (map[arr[index].parentId] != undefined){
        map[arr[index].parentId].children.push(arr[index]);
        // delete map[arr[index].parentId];
      }
    }
    for (let value of Object.values(map)) {
      root.push(value);
    }
    return root;
  }
  


}
