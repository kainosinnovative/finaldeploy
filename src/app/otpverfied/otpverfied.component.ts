
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { config_url } from '../shared/customer/constant';


@Component({
  selector: 'app-otpverfied',
  templateUrl: './otpverfied.component.html',
  styleUrls: ['./otpverfied.component.scss']
})
export class OtpverfiedComponent implements OnInit {
  showMyContainer: boolean = false;
  showTimerContainer:boolean=true;
  isloggedinUser = localStorage.getItem('isloggedinUser');

  shopname = localStorage.getItem('name');
  public  dataForm1: FormGroup;
  dialog: any;
  // dialogRef: any;
  name = 'Angular 6';
  timeLeft: number = 20;
  interval:any;

  otpFirstDigit:any;
  otpSecondDigit:any;
  otpThirdDigit:any;
  otpFourthDigit:any;
  orderby: any;
  customerdata:any;
  customerdata1:any;
  customerdata2:any;
  citytype:any;
  citytype1:any;


constructor(public router: Router, public restApi: RestApiService,private  dialogRef:  MatDialogRef<OtpverfiedComponent>,
  @Inject(MAT_DIALOG_DATA) public  data:  any,
  private frmbuilder: FormBuilder,private http: HttpClient,private toastr: ToastrService) { };

ngOnInit(): void {
  this.dataForm1 = this.frmbuilder.group({
    mobile: [this.isloggedinUser, null],

    });
 this.startTimer();
//  this.loadcitylist();
}





loadCustomerDetails2(Objval:any) {
  // alert("in")
  console.log("in");
  let isloggedinUser = localStorage.getItem('isloggedinUser');
  let loginfor = localStorage.getItem('loginfor');


  var jsonObject =
                {
                  "isloggedinUser": isloggedinUser,
                  "loginfor": loginfor

                  }
  // this.loadLoginuserTestimonial();

  return this.restApi.getCustomerData(jsonObject).subscribe((data => {
    this.customerdata = data;
      this.customerdata1 = this.customerdata.data;
      this.customerdata2 = this.customerdata1.SingleCustomerDetails;

      console.log("abi>>",this.customerdata2)

      if(loginfor == 'shopowner') {

      localStorage.setItem('currentUsername', this.customerdata2[0].firstname);
      localStorage.setItem('currentUserId', this.customerdata2[0].shop_id);
      localStorage.setItem('userroleSes', 'shopOwnerSes');
      localStorage.setItem('currentLogincity', this.customerdata2[0].city);
      localStorage.setItem('shoplogo', this.customerdata2[0].shop_logo);
      localStorage.setItem('shopname', this.customerdata2[0].name);
      // localStorage.setItem('name', currentshopname);
      }
      else {
        localStorage.setItem('currentUsername', this.customerdata2[0].firstname);
      localStorage.setItem('currentUserId', this.customerdata2[0].customer_id);
      localStorage.setItem('userroleSes', 'CustomerSes');
      if(this.customerdata2[0].city != null) {
        localStorage.setItem('selectedCity', this.customerdata2[0].city);

        this.restApi.getcitylistbycityid(this.customerdata2[0].city).subscribe((citylistdata: {}) => {

          // console.log(citylistdata)
           this.citytype = citylistdata;

           // console.log(this.citytype)
       //console.log("hi")
           this.citytype1 = this.citytype.data.citylistbyid;


            console.log("clist>>>",this.citytype1);
            localStorage.setItem('selectedCityname', this.citytype1[0].city_name);
         })

        // for(let i=0;i<=this.citytype1.length;i++){
        //   console.log("clist>>>",this.citytype1[i].city_id);
        //   console.log("cust>>>>>",this.customerdata2[0].city);

        //   if(this.customerdata2[0].city === this.citytype1[i].city_id) {
        //   localStorage.setItem('selectedCityname', this.citytype1[i].city_name);
        //   }
        // }

      }

      }


      this.showloginSuccess();
      // this.toastr.success(Objval+' Successfully');
      // window.location.reload();
      this.pagerefresh();
  }
  ))

}


showloginSuccess() {
  console.log("login message");

  this.toastr.success('Logged In Successfully');

      //
}

pagerefresh() {
  // window.location.reload();
let userroleSes = localStorage.getItem('userroleSes');
// alert(userroleSes)
  if(userroleSes == 'CustomerSes'){
    this.router.navigate(['/home']);
  }
  else {
    this.router.navigate(['/ShopDashboard']);
  }

  window.setTimeout(function(){location.reload()},2000)
}


pagerefresh1() {
  // window.location.reload();
let loginfor = localStorage.getItem('loginfor');
// alert(loginfor)
  if(loginfor == 'customersignup'){
    this.router.navigate(['/home']);

  }
  else {
    this.router.navigate(['/shoplogin']);
  }

  window.setTimeout(function(){location.reload()},2000)
}


signupdetailsInsert(){
  // alert("hi")
  let registerUserName = localStorage.getItem('registerUserName');
      let registerEmailid = localStorage.getItem('registerEmailid');
      let registerMobileNo = localStorage.getItem('registerMobileNo');
      let loginfor = localStorage.getItem('loginfor');

  this.http.get(config_url+'/app/signupCustomer?customer_name='+registerUserName+
  '&customer_mobileno='+registerMobileNo + '&customer_email='+registerEmailid + '&loginFor='+loginfor ).subscribe(
    data => {
      // alert(data)
    },
    error => {
      // alert(error)
      console.log(error.status)
      if(error.status == "200") {
        this.showsuccess();
        this.pagerefresh1();
      }
    }


   );



  // console.log("in");

  // localStorage.removeItem("otpstore");
  // window.location.reload();
  // this.dialogRef.close();

  // this.loadCustomerDetails2("this.toastr.success(Objval+' Successfully');");

  //let registerUserName = localStorage.getItem('registerUserName');



  }

  showsuccess() {
    console.log("success");
    this.toastr.success('Registered Successfully Please Login');
    // window.location.reload();
  }


  closeMe() {
    this.dialogRef.close();
 }


  VerifyOtp(){
    var ReceiveOtp = localStorage.getItem('otpstore');
    //  alert("ReceiveOtp>>>"+ReceiveOtp)
    var firstDigit = this.otpFirstDigit;
    let SecondDigit = this.otpSecondDigit;
    let thirdDigit = this.otpThirdDigit;
    let fourthDigit = this.otpFourthDigit;

    let EnteredOtp = firstDigit + SecondDigit +thirdDigit + fourthDigit;
    // alert("EnteredOtp>>>"+EnteredOtp)

    if(ReceiveOtp == EnteredOtp) {
      localStorage.removeItem("otpstore");
      let sessionbtn = localStorage.getItem('sessionbtn');
      if(sessionbtn == "login") {
        this.loadCustomerDetails2("Loggedin");
      }
      else {
  this.signupdetailsInsert();
      }
    }
    else {
      (document.getElementById('invalidOtp') as HTMLFormElement).innerHTML = "Invalid Otp";
    }
  }






sendotp2(dataForm1: any) {
  // alert()
  // this.pauseTimer();
  this.timeLeft=20;
     this.startTimer();
      this.http.post(config_url+'/app/sendOtp2', dataForm1).subscribe(

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

                // (document.getElementById('pleaseregister') as HTMLFormElement).innerHTML = newStr;

              }
              else {
                let msg3 = success.error.text;


  let split_string = msg3.split(/(\d+)/)
  // alert(split_string[1])
  localStorage.setItem('otpstore', "1234");
  // localStorage.setItem('otpstore', split_string[1]);
  localStorage.setItem('isloggedinUser', dataForm1.mobile);
                // this.dialogRef.close();
    //             const dialogRef = this.dialog.open(OtpverfiedComponent, {
    //   id: 'otpverfied'
    // });
              }

          }
      );
  }
  startTimer() {

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
       this.showTimerContainer=true;
       this.showMyContainer=false;
      }

      else{
          this.showMyContainer=true;
      this.showTimerContainer=false;
     // this.timeLeft=10;
    //  alert("in")
    localStorage.removeItem("otpstore");
       }
    },2000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  move(event:any,p:any,c:any,n:any){
    var length=c.value.length;
    var maxlength=c.getAttribute('maxlength');
    if(length==maxlength)
    {
      if(n!="")
      {
        n.focus();
      }
    }
    if(event.key==="Backspace")
    {

       if(p!="")
       {
        p.focus();
       }
    }
}

  }





function currentshopname(arg0: string, currentshopname: any) {
  throw new Error('Function not implemented.');
}
// function loadCustomerDetails() {
//   throw new Error('Function not implemented.');
// }





