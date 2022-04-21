import { Component,ElementRef,VERSION, ViewChild,Injectable } from '@angular/core';
import { OnInit } from  '@angular/core';
import { LoginComponent } from './login/login.component';
import { NavigationEnd, Router,ActivatedRoute,ParamMap, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import { EventEmitterService } from './event-emitter.service';
import { DatePipe } from '@angular/common';
import { RestApiService } from "./shared/rest-api.service";
import { ToastrService } from 'ngx-toastr';
import { FormControl } from "@angular/forms";
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchshopPopupComponent } from './searchshop-popup/searchshop-popup.component';
import { config_url } from './shared/customer/constant';

@Injectable({
  providedIn: 'root'
})

export class Service {
  apiURL = config_url;
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    let city= localStorage.getItem('selectedCity');
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.apiURL+'/shop/getallshoplist?city_id='+city).pipe(tap(data => this.opts = data))
    
 }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})


export class AppComponent implements OnInit{

  apiurlforhtm = config_url;

  filteredOptions: Observable<any[]>;

  myControl = new FormControl();
  
  currentUserId = localStorage.getItem('currentUserId');

  currentUsername = localStorage.getItem('currentUsername');

  currentshopname = localStorage.getItem('shopname');
 

  userroleSes = localStorage.getItem('userroleSes');



shoplogo:any;
  title = 'angular6-sidenav-example';
  cont_id: any;
  cityid: any;
  cityname:any;
  // currentshopname: any;
  // topScroll: any;
  date1:any;
  currenttime:any;
  ShopHolidaysDetails:any;
  ShopHolidaysDetails1:any;

  

constructor(private service: Service,private  dialog:  MatDialog, private  router:  Router,private eventEmitterService: EventEmitterService,
  public datepipe: DatePipe,public restApi: RestApiService,private toastr: ToastrService ){
   
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       })
    )

  }
  closemenu() {
    console.log("hi")

  }

  


  ngOnInit(): void {

     console.log(this.currentshopname);

    this.getholidaysForAll();
    this.date1=new Date();
  
    
    this.currenttime = this.datepipe.transform(this.date1, 'HH:mm');
    
    this.shoplogo = localStorage.getItem('shoplogo');
    //  var cityid:any;
    this.cityid = localStorage.getItem('selectedCity');
    this.cityname=localStorage.getItem('selectedCityname');
    // this.currentshopname=localStorage.getItem('shopname');

 

  //  alert(this.cityid);
    if(this.cityid == null ){
      this.cityid = 3;
      this.cityname="Arakkonam";
      localStorage.setItem('selectedCity',this.cityid);
      localStorage.setItem('selectedCityname',this.cityname);
    }
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe(() => {
        this.login();
        this.loginCheck1();
      });
    }

 


  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter((option:any) => {
         return option.name1.toLowerCase().indexOf(val.toLowerCase()) >-1
       }))
     )
   }

   onSelFunc(option: any){
     console.log(option);
     this.router.navigate(['/search/'+option]);
     window.setTimeout(function(){location.reload()},10)
   }

   onSelFunc1(option: any){
    console.log(option);
    this.router.navigate(['/search/'+option]);
    window.setTimeout(function(){location.reload()},10)
   }
   

  onActivate(event:any) {

 }

  login(){
    console.log("hiiiii1111");
       this.dialog.open(LoginComponent,{disableClose: true});
    console.log("test>>>>",localStorage.getItem('isLoggedIn'))
  }

    signup(){
      console.log("hiiiii1111");
         this.dialog.open(SignupComponent);
    

}

Otpvrf(){
  console.log("hiiiii1111");
    //  this.dialog.open(OtpverfiedComponent);
  // console.log("test>>>>",localStorage.getItem('isLoggedIn'))
}

logout() {


  // window.location.reload();
  this.movetohome();

}

movetohome() {
  let userroleSes = localStorage.getItem('userroleSes');
  // alert(userroleSes)
  if(userroleSes == 'CustomerSes'){
    window.localStorage.clear();
    this.router.navigate(['/home']);
  }
  if(userroleSes == 'shopOwnerSes'){
    window.localStorage.clear();
    this.router.navigate(['/shoplogin']);
  }

  window.setTimeout(function(){location.reload()},100)
}

loginCheck() {
  // alert("shop")
  localStorage.removeItem("loginfor");
  localStorage.setItem('loginfor','shopowner');
}

loginCheck1() {
  // alert("customer")
  localStorage.removeItem("loginfor");
  localStorage.setItem('loginfor','customer');
}


selectcity(){

     this.dialog.open(SelectcityComponent,{disableClose: true});

}

getholidaysForAll() {
        
  this.restApi.getholidaysForAll().subscribe((res)=>{
    this.ShopHolidaysDetails = res
 
    this.ShopHolidaysDetails1 = this.ShopHolidaysDetails;
    console.log("ShopHolidaysDetails1>>>",this.ShopHolidaysDetails1);
  //  this.MoveShopHoliday();
    // this.MoveShopOfferHoliday();
  }
  );
}

 closing = false;
bookingRedirect() {
  let shop_id = localStorage.getItem('currentUserId');

  for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {
    
    if(shop_id == this.ShopHolidaysDetails1[i].shop_id) {
      // alert("hi");
      if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
      this.closing = true;
      this.toastr.error('Closed today from ' + this.ShopHolidaysDetails1[i].leave_timing_from + " to " + this.ShopHolidaysDetails1[i].leave_timing_to);
}
    }
  }
  // alert(this.closing);
if(this.closing == false) {
this.router.navigate(['/shopownerOnlineBooking/'+shop_id]);
}
}


searchshopMobile(){

  this.dialog.open(SearchshopPopupComponent,{disableClose: true,width: '100%'});
}


}
 

