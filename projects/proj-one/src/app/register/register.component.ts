import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements AfterViewInit, OnInit{

  // Regex
  // [1-9][0-9][0-9] == [1-9]\d{2}
  // [0-9]* means 5151512085498...
  // /.{5}/ every thing 5 times
  // \d = [0-9]
  // /i : case insensitive
  // /g : global
  // [from-to] : range from to
  // [aeb] : single char a or e or b
  // [A-Za-z\d@#$%&*!]{6,12} means: pick from range and repeat it from 6 to 12 times
  // /^The/ first of line
  // /bye$/ end of line
  // /^bye$/ the only thing that exists has to be bye (without any spaces after or before of it)
  // /./g dot means every thing
  // /\./g just look for dot
  // الف to unicode : &#x0627;&#x0644;&#x0641; use online converter
  /**
   *  n is equivalent to a number
   *  nnn.nnn.nnnn
   *  nnn-nnn-nnnn
   *  (nnn)-nnn-nnnn
   *
   *  regex = /\(?\d3\)?[-.]?\d{3}[-.]?\d{4}/;
   *  ? means optional - exist one or not
   */

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
      character: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^([\u0628-\u06cc]|[\u0627][\u0644][\u0641])$/)]),
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

  ngOnInit(): void {

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
    this.customerForm.setErrors({'incorrect': true });
  }
}
