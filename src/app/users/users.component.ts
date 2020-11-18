import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { User } from './shared/user.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

interface position {
  value: string;
  viewValue: string;
}


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "zh-tw" },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
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
    imageSrc:string = '';
  // color: ThemePalette = 'primary';
    disabled: boolean = false;
    multiple: boolean = false;
    accept: string;
    fileControl: FormControl;
    format = '';
    imageURL: string;
    uploadForm: FormGroup;
    url;
    date = new FormControl(moment());
    militaryStartDay = new FormControl(moment());
    militaryEndDay = new FormControl(moment());
    startSchoolDay = new FormControl(moment());
    chTyping = false;
    chTypingValue = 1;

    public schoolList: any[] = [{
      id :1,
      schoolName: '',
      schoolSystem: '',
      major: '',
      duringDate: '',
      status:''
    }];


    public workList: any[] = [{
      id :1,
      companyName: '',
      position: '',
      duringDate: '',
      salary: '',
      reason:'',
      result:''
    }];

    positionList: position[] = [
      {value: 'IT-position1', viewValue: '系統開發組'},
      {value: 'IT-position2', viewValue: '網路工程組'},
      {value: 'IT-position3', viewValue: '需求規劃組'}
    ];


  constructor(private _formBuilder: FormBuilder) {
    this.uploadForm = this._formBuilder.group({
      avatar: [null],
      name: ['']
    })
  }

    ngOnInit() {
      this.createForm();

    }

    createForm() {
      // this.basicFormGroup = this._formBuilder.group({
      //   localName: ['', Validators.required],
      //   englishName:'',
      //   position:['', Validators.required],
      //   idNumber:['', Validators.required],
      //   birthday:['', Validators.required],
      //   nationality:['', Validators.required]
      // });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ''
      });
    }


    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
    }

    chosenYearHandler(normalizedYear: Moment, date:FormControl) {
      const ctrlValue = date.value;
      ctrlValue.year(normalizedYear.year());
      date.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, date:FormControl) {
      const ctrlValue = date.value;
      ctrlValue.month(normalizedMonth.month());
      date.setValue(ctrlValue);
      datepicker.close();
    }

    addSchool(){
      this.schoolList.push({
        id: this.schoolList.length + 1,
        schoolName: '',
        schoolSystem: '',
        major: '',
        duringDate: '',
        status:''
      });
    }

    removeSchool(i: number) {
      this.schoolList.splice(i, 1);
    }



    addWork(){
      this.workList.push({
        id: this.workList.length + 1,
        companyName: '',
        position: '',
        duringDate: '',
        salary: '',
        reason:'',
        result:''
      });
    }

    removeWork(i: number) {
      this.workList.splice(i, 1);
    }



    logSchoolValue() {
      console.log(this.schoolList);
    }

    logWorkValue() {
      console.log(this.workList);
    }

}
