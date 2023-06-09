import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEntity } from '../shared/models/models';
import { ApiService } from '../shared/services/api.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit{

  @ViewChild('tableSearchFilter') set tableSearchFilter(value: ElementRef<HTMLInputElement>){
    // if(value){
    //   value.nativeElement.focus();
    // }
  }

  userList$!: Observable<IEntity[] | null>;
  tableSearchInput = '';
  treeNodeSearchInput = '';
  sortOrder: -1 | 1 = 1;
  treeNodeSortOrder: -1 | 1 = 1;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.userList$ = this.apiService.getUsers().pipe(
      map(x => x.data.list0.concat(x.data.list1))
    );
  }

  sort(){
    this.sortOrder = (this.sortOrder*-1) as 1 || -1;
  }

  treeNodeSort(){
    this.treeNodeSortOrder = (this.treeNodeSortOrder*-1) as 1 || -1;
  }
}
