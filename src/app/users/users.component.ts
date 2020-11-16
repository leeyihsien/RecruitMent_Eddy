import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { User } from './shared/user.model';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';

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


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }


}
