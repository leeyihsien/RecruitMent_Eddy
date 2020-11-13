import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './shared/user.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "zh-tw" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ]
})
export class UsersComponent implements OnInit {

  @Input() users: User;
  basicFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.basicFormGroup = this._formBuilder.group({
      localName: ['', Validators.required],
      englishName:'',
      position:['', Validators.required],
      idNumber:['', Validators.required],
      birthday:['', Validators.required],
      nationality:['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

    isSelected(num: string): boolean{

        if (num == '1' || num == '2' || num =='3') { // if no radio button is selected, always return false so every nothing is shown
            return true;
           } else
            return false; // if current radio button is selected, return true, else return false
    }

}
