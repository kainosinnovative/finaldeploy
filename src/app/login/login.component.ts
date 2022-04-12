import { Component, OnInit,Input } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { config_url } from '../shared/customer/constant';

// import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public  dataForm: FormGroup;
  mobno: string = "";
  
  loginfor = localStorage.getItem('loginfor');
 //dialog: any;
  // @Input() logindetails = { mobno:''}

  constructor(private  dialogRef:  MatDialogRef<LoginComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router,public restApi: RestApiService,
  public dialog: MatDialog,private http: HttpClient,private frmbuilder: FormBuilder) {


  }

  ngOnInit(): void {
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.dataForm = this.frmbuilder.group({
      mobile:['', [Validators.required, Validators.pattern(mobilePattern)]],
     
      loginfor:[localStorage.getItem('loginfor'),null]
     
      });
  }
  closeMe() {
      this.dialogRef.close();
  }

    
 signup(){
  localStorage.setItem('loginfor','customersignup');
  const dialogRef = this.dialog.open(SignupComponent, {
    id: 'signup',disableClose: true
  });

  console.log(dialogRef);
}

Otpvrf(){

  

  // console.log(dialogRef);
}


  sendotp1(dataForm: any) {
// alert()
    console.log("send otp>>>>>")
    this.http.post(config_url+'/app/sendOtp1', dataForm).subscribe(
      
        data => {
            console.log('POST Request is successful >>>>>>>>', data);

        },
        success => {
            console.log('Error>>>>>', success);
           
            
            if(success.status == 404) {
              let msg = success.error;
              // let text = "How are you doing today?";
const myArray = msg.split("message");
const secondArr = myArray[1].split(",");
let str = secondArr[0].substring(3);
var newStr = str.substring(0, str.length - 1);

              (document.getElementById('pleaseregister') as HTMLFormElement).innerHTML = newStr;
              
            }
            else {
              let msg3 = success.error.text;

              
let split_string = msg3.split(/(\d+)/)
// alert(split_string[1])
localStorage.setItem('otpstore', "1234");
// localStorage.setItem('otpstore', split_string[1]);
localStorage.setItem('isloggedinUser', dataForm.mobile); 
localStorage.setItem('sessionbtn', "login");             
              this.dialogRef.close();
              const dialogRef = this.dialog.open(OtpverfiedComponent, {
    id: 'otpverfied',disableClose: true
  });
            }
           
        }
    );
}


removeErrormessage() {
  // pleaseregister
  (<HTMLInputElement>document.getElementById("pleaseregister")).innerHTML = "";
}



}
