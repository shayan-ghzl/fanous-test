import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiService } from '../shared/services/api.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit{

  @ViewChild('tableSearchFilter') set tableSearchFilter(value: ElementRef<HTMLInputElement>){
    if(value){
      setTimeout(() => {
        value.nativeElement.focus();
      }, 0);
    }
  }

  userList$: Observable<any[] | null> = of(null);
  tableSearchInput = '';
  sortName: -1 | 1 | null = null;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.userList$ = this.apiService.getUsers().pipe(
      map(x => x.data.list0)
    );
  }


  sort(){
    this.sortName = ((this.sortName) ? this.sortName * -1 : 1) as 1 || -1;
  }
}
