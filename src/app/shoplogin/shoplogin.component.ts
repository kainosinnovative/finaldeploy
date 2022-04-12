import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { config_url } from '../shared/customer/constant';



@Component({
  selector: 'app-shoplogin',
  templateUrl: './shoplogin.component.html',
  styleUrls: ['./shoplogin.component.scss']
})
export class ShoploginComponent implements OnInit {
  apiurlforhtm = config_url;
  public  shopform: FormGroup;
 
  

  constructor(
    public dialog: MatDialog,
    private frmbuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.setItem('loginfor','shopowner');
    
    (<HTMLInputElement>document.getElementById('footerdisplay')).style.display = "none";

    (<HTMLInputElement>document.getElementById('headerdisplay')).style.display = "none";

    if((<HTMLInputElement>document.getElementById('rightsidebarShopRemove'))){
    (<HTMLInputElement>document.getElementById('rightsidebarShopRemove')).style.display = "none";
    }


    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.shopform = this.frmbuilder.group({
      mobile:['', [Validators.required, Validators.pattern(mobilePattern)]],
     
      loginfor:'shopowner'
     
      });

  }

  sendotp1(shopform: any) {


    // alert()
        console.log("send otp>>>>>")
        this.http.post(config_url+'/app/sendOtp1', shopform).subscribe(
          
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
    localStorage.setItem('isloggedinUser', shopform.mobile); 
    localStorage.setItem('sessionbtn', "login");             
                  //this.dialogRef.close();
                  const dialogRef = this.dialog.open(OtpverfiedComponent, {
        id: 'otpverfied',disableClose: true
      });
                }
               
            }
        );
    }
    
    
    signup(){
      localStorage.setItem('loginfor','shopownersignup');

      const dialogRef = this.dialog.open(SignupComponent, {
        id: 'signup',disableClose: true
      });
    
      console.log(dialogRef);
    }   

    signupcheck() {
      // localStorage.setItem('loginfor','customersignup');
    }

    logincheck() {
      localStorage.setItem('loginfor','shopowner');
    }

    removesignupErrorMsg() {
      (<HTMLInputElement>document.getElementById("pleaseregister")).innerHTML = "";
    }
 
}


