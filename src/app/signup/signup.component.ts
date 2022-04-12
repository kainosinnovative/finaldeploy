import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { config_url } from '../shared/customer/constant';



import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  dataForm3: any;



  

  constructor(private  dialogRef:  MatDialogRef<SignupComponent>,
     @Inject(MAT_DIALOG_DATA) 
     public  data:  any,
     public router: Router,
     private frmbuilder: FormBuilder,
     private http: HttpClient,
     public restApi: RestApiService,public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.dataForm3 = this.frmbuilder.group({
      username: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
      registermobno:['', [Validators.required, Validators.pattern(mobilePattern)]],
      loginFor: [localStorage.getItem('loginfor')]
     
      });

     
    
  }

  closeMe() {
    this.dialogRef.close();
  }
  
  
  
  signup() {
      // alert("hi")
      // this.restApi.signup(dataForm).subscribe()
    }


  login(){

    const dialogRef = this.dialog.open(LoginComponent, {
      id: 'login'
    });
  
    // console.log(dialogRef);
  }
 


Otpvrf(){

  const dialogRef = this.dialog.open(OtpverfiedComponent, {
    id: 'otpverfied',disableClose: true
  });

  // console.log(dialogRef);
}

removeErrorMsg() {
  // alert("hi")
  (<HTMLInputElement>document.getElementById("pleaseregister1")).innerHTML = "";
}


sendotp3(dataForm3: any) {

  
  this.http.post(config_url+'/app/sendOtp3', dataForm3).subscribe(
      
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

          (document.getElementById('pleaseregister1') as HTMLFormElement).innerHTML = newStr;
          
        }
        else {
          let msg3 = success.error.text;

          
let split_string = msg3.split(/(\d+)/)
// alert(split_string[1])
localStorage.setItem('otpstore', "1234");
// localStorage.setItem('otpstore', split_string[1]);
             
          localStorage.setItem('registerUserName', dataForm3.username);
  localStorage.setItem('registerEmailid', dataForm3.emailid);
  localStorage.setItem('registerMobileNo', dataForm3.registermobno);

  localStorage.setItem('isloggedinUser', dataForm3.registermobno);

  localStorage.setItem('sessionbtn', "register");

          this.dialogRef.close();
          const dialogRef = this.dialog.open(OtpverfiedComponent, {
id: 'otpverfied'
});
        }
       
    }
);


  

  // alert(dataForm3.username)
  // alert("hi")
 
 
}

}




