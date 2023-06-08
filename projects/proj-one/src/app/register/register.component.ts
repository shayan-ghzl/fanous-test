import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements AfterViewInit{
  // Regex
  // [1-9][0-9][0-9] == [1-9]\d{2}
  // \d = [0-9]
  // /i : case insensitive
  // /g : global
  // [from-to] : range from to
  // [aeb] : single char a or e or b
  @ViewChild('autoFocus') usernameInput!: ElementRef<HTMLInputElement>;

  today!: string;
  todayJalali!: string;
  printJsonValue = {};

  customerForm = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9]{3,12}$/i)]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{6,12}$/)]),
    carId: new FormGroup({
      cityCode: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[1-9][0-9]$/)]),
      threeDigit: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[1-9]\d{2}$/)]),
      character: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[\u0600-\u06FF]$/)]),
      twoDigit: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[1-9][0-9]$/)]),
    }),
  });


  constructor(){
    /**
      * this is how we extend an object in js
      * so we add a new method to it
    */
    //  @ts-ignore:
    Date.prototype.formatDate = function() {
      // getMonth() is zero-based
      let month = '' + (this.getMonth() + 1),
      day = '' + this.getDate(),
      year = this.getFullYear();

      if (month.length < 2) 
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;

      return [year, month, day].join('/');
    };
    //  @ts-ignore:
    this.today = new Date().formatDate();

    const MomentDate = moment(this.today, 'YYYY/MM/DD');
    this.todayJalali = MomentDate.locale('fa').format('YYYY/MM/DD');
  }

  ngAfterViewInit(): void {
    this.usernameInput.nativeElement.focus();
  }
  
  /**
    * or you can use it as a component method
  */
  // formatDate(date: Date) {
  //   // getMonth() is zero-based
  //   let month = '' + (date.getMonth() + 1),
  //       day = '' + date.getDate(),
  //       year = date.getFullYear();

  //   if (month.length < 2) 
  //       month = '0' + month;
  //   if (day.length < 2) 
  //       day = '0' + day;

  //   return [year, month, day].join('/');
  // }

  @HostListener('document:keyup.enter')
  submit(){
    if (this.customerForm.invalid) {
      return;
    }
    
    this.printJsonValue = {...this.customerForm.value, gregorian: this.today, jalali: this.todayJalali};
  }
}
