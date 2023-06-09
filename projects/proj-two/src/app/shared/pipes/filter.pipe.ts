import { Pipe, PipeTransform } from '@angular/core';
import { IEntity } from '../models/models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: IEntity[] | null, inputVal: string, fields: string[], ascendant: 1 | -1, treenode: boolean): any[] | null {
    if(value){
      return this.search(inputVal, value, fields, ascendant, treenode);
    }
    return value;
  }

  search(value: string, list: IEntity[], fields: string[], ascendant: 1 | -1, treenode: boolean){
    const keyword = value.trim().toLowerCase();
    let temp: IEntity[] = [];
    temp = list.filter(x => this.searchInFields(x, fields).includes(keyword));
 
    if (treenode) {
      // this is where it goes to tree node
      temp = this.convertListToTreenode(temp, ascendant);
    }else{
      temp.sort((a: IEntity, b: IEntity) => ascendant);
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

  convertListToTreenode(list:IEntity[], ascendant: 1 | -1, parentId = 0) {
    const temp: any[] = [];
    list.filter(p => p.parentId == parentId).sort((a: IEntity, b: IEntity) => ascendant).forEach((Element) => {
      temp.push({
        ...Element,
        children: this.convertListToTreenode(list, ascendant, Element.id)
      });
    });
    return temp;
  }

  // Raw Function
  // convertListToTreenode(list:IEntity[], parentId = 0) {
  //   let temp: any[] = [];
  //   list.filter(p => p.parentId == parentId).forEach((Element) => {
  //     temp.push({
  //       ...Element,
  //       children: this.convertListToTreenode(list, Element.id)
  //     });
  //   });
  //   return temp;
  // }

}