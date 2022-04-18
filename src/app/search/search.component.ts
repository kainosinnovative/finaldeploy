import { Component, OnInit,Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { RestApiService } from "../shared/rest-api.service";

import { Observable,of } from "rxjs";
import { DatePipe } from '@angular/common';

import { Router,ActivatedRoute,ParamMap, Params  } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';
import { HttpClient } from '@angular/common/http';
import { style } from '@angular/animations';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { ToastrService } from 'ngx-toastr';

import { config_url } from '../shared/customer/constant';

import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })

// export class Service {
//   apiURL = '';
//   constructor(private http: HttpClient) { }

//   opts = [];

//   getData() {
//     let city= localStorage.getItem('selectedCity');
//     return this.opts.length ?
//       of(this.opts) :
//       this.http.get<any>(this.apiURL+'/shop/getallshoplist?city_id='+city).pipe(tap(data => this.opts = data))
    
//  }

// }
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe]
})
export class SearchComponent implements OnInit {
  apiurlforhtm = config_url;
  currenttime:any;
  currentUsername = localStorage.getItem('currentUsername');
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  MasterServiceData:any;
  MasterServiceData1:any;
  wishlistdata: any;
wishlistdata1: any;
date:any;
isshopOrService:any;
private innerWidth: number;
  private mobileBreakpoint = 480;
  ShopHolidaysDetails:any;
  ShopHolidaysDetails1:any;
  customerId:any;
  constructor(public datepipe: DatePipe,private toastr: ToastrService,public restApi: RestApiService,
    private route:ActivatedRoute,private router:Router,private eventEmitterService: EventEmitterService,
    private http: HttpClient) {
    //  this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap(val => {
    //         return this.filter(val || '')
    //    })
    // )
   }
   userroleSes = localStorage.getItem('userroleSes');
   dashboardShop:any;
   dashboardShop1:any;
   dashboardShopoffer:any;
   dashboardShopoffer1:any;
   CustomerWhislistData:any;
   CustomerWhislistData1:any;
   carDetailsById:any;
   carDetailsById1:any;
   date1:any;
   ProfileDataByIdObject:any;
   ShopProfileDetails:any;
   serviceidval:any;
  ngOnInit() {
    this.adjustsItemsPerSlide();
    this.date=new Date();
    this.date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.date1=new Date();
    this.currenttime = this.datepipe.transform(this.date1, 'HH:mm');
    this.loadMasterService();
    // this.dashboardShop1='';
    // this.dashboardShopoffer1='';
    this.route.params.subscribe(params => {
      const id2 = params['id'];
      this.onSelFunc(id2);
      this.onSelFunc1(id2);
      let result = id2.includes("S");
      if(result == true) {
      this.isshopOrService = "service";
      this.serviceidval = id2;
      }
      else {
        this.isshopOrService = "shop";
        this.readProfileDataById(id2);
      }
    }
    )
    
  }


  readProfileDataById(shopid:any) {
  
    
    return this.restApi.readShopProfileDataById(shopid).subscribe((res)=>{
      this.ProfileDataByIdObject = res
  
      
      this.ShopProfileDetails = this.ProfileDataByIdObject.data.profile
      console.log("ShopProfileDetails>>>",this.ShopProfileDetails)
      
    }
      
    
    )
    
  }
  

  // filter(val: string): Observable<any[]> {
  //   // call the service which makes the http-request
  //   return this.service.getData()
  //    .pipe(
  //      map(response => response.filter((option:any) => {
  //        return option.name1.toLowerCase().indexOf(val.toLowerCase()) >-1
  //      }))
  //    )
  //  }
   onSelFunc(option: any){

    

    console.log(option);
    let city1= localStorage.getItem('selectedCity');
   return this.restApi.dashboardShopSearch(option,city1).subscribe((data: {}) => {
     //alert(data)
      this.dashboardShop = data;
      this.dashboardShop1 = this.dashboardShop.data.dashboardShopSearch;
      console.log("data dashboard>>>",this.dashboardShop1);
      if(!this.dashboardShop1)
      {
        this.dashboardShop1='';
      }
      this.getholidaysForAll();
      this.loadcarDetailsById();
      this.customerId= localStorage.getItem('currentUserId');
   console.log(this.customerId);
    if(this.customerId != null)
    {
    this.customerWhislist(this.customerId);
    }
    })
  }
  onSelFunc1(option: any){
    console.log(option);
    let city1= localStorage.getItem('selectedCity');
    return this.restApi.dashboardShopSearchoffer(option,city1).subscribe((data: {}) => {
      //alert(data)
       this.dashboardShopoffer = data;
       this.dashboardShopoffer1 = this.dashboardShopoffer.data.dashboardShopDetailsByOffer;

       console.log("data dashboard1>>>",this.dashboardShopoffer1);
       this.getholidaysForAll();

       this.customerId= localStorage.getItem('currentUserId');
   console.log(this.customerId);
    if(this.customerId != null)
    {
    this.customerWhislist(this.customerId);
    }
     })

  }

  loadcarDetailsById(){

    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.CarDetailsById(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.carDetailsById = data;
      this.carDetailsById1 = this.carDetailsById.data.CarDetailsByCustomerId;
      console.log("carDetailsById1>>>",this.carDetailsById1)
      this.MovecarDetailsById();
      this.MovecarDetForOffer();
    })
  }


  MovecarDetailsById() {
        
    if(this.carDetailsById1 != undefined) {
    for(var i=0;i < this.carDetailsById1.length;i++) {

      for(var j=0;j < (this.dashboardShop1.length);j++) {
        if(this.dashboardShop1[j].model_id == this.carDetailsById1[i].model){
          
          var newNum = "modelAvail";
          var newVal = "Available";
          this.dashboardShop1[j][newNum] = newVal;
        }
        
       
      }

    }
  }

    console.log("car avl>>>",this.dashboardShop1);
  }

  MovecarDetForOffer() {
        
    if(this.carDetailsById1 != undefined) {
    for(var i=0;i < this.carDetailsById1.length;i++) {

      for(var j=0;j < (this.dashboardShopoffer1.length);j++) {
        if(this.dashboardShopoffer1[j].model_id == this.carDetailsById1[i].model){
          // alert(this.dashboardShop1[j].model_id);
          var newNum = "modelAvail";
          var newVal = "Available";
          this.dashboardShopoffer1[j][newNum] = newVal;
        }
        
        //console.log("val",this.dashboardShop1);
        // this.datecheckArr.push(ShopHolidaysDetails1[i])
       
      }

    }
  }


    
    console.log("car avl dashboardShopoffer1>>>",this.dashboardShopoffer1);
  }

  loadMasterService(){

    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;

      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })


  }

  clickEvent(shopid :number,action:any){
    //alert(action)
    if(!this.userroleSes)
    {
      this.eventEmitterService.onFirstComponentButtonClick();
     // alert("please login");
    }
    else {
    var wishlist1:any;
   //  if(action == "combooffer") {
     wishlist1="wishlistvalue_"+ shopid;
   //  }
   //  else {
    let  wishlist2="wishlistvalue2_"+ shopid;
   //  }

    let  customerid = localStorage.getItem('currentUserId');
    let cityid = localStorage.getItem('selectedCity');



    //let wishlist1 =  (<HTMLInputElement>document.getElementById(wishlist)).innerHTML;
    //console.log(wishlist1)
    var wishlistcolor:any;
     if(action == "combooffer") {
 wishlistcolor =  (<HTMLInputElement>document.getElementById(wishlist1)).style.color;
     }else {
       wishlistcolor =  (<HTMLInputElement>document.getElementById(wishlist2)).style.color;
     }
 //alert(wishlistcolor)

 if(wishlistcolor === "gray"){

 this.http.get(config_url+'/app/Addwhislist?date='+this.date+
       '&Customer_id='+customerid + '&city_id='+cityid + '&shop_id='+shopid).subscribe(
         (data: any) => {
       console.log(data)





       this.wishlistdata = data;
       if(this.wishlistdata.status === "pass"){

         if((<HTMLInputElement>document.getElementById(wishlist1)) != null) {
           (<HTMLInputElement>document.getElementById(wishlist1)).style.color = "red";

           (<HTMLInputElement>document.getElementById(wishlist1)).style.cursor = "pointer";
         }

         if((<HTMLInputElement>document.getElementById(wishlist2)) != null) {
           (<HTMLInputElement>document.getElementById(wishlist2)).style.color = "red";

           (<HTMLInputElement>document.getElementById(wishlist2)).style.cursor = "pointer";
         }

       
       // document.getElementById("myP").style.cursor = "pointer";
        this.showloginSuccess();
        }
     }
      );
}

else
 {
     this.http.get(config_url+'/app/Deletewhislist?date='+this.date+
       '&Customer_id='+customerid + '&city_id='+cityid + '&shop_id='+shopid).subscribe(
         (data: any) => {
       //console.log(data)



       this.wishlistdata1 = data;
       if(this.wishlistdata1.status === "pass"){

         if((<HTMLInputElement>document.getElementById(wishlist1)) != null) {
           (<HTMLInputElement>document.getElementById(wishlist1)).style.color = "gray";

         }

         if((<HTMLInputElement>document.getElementById(wishlist2)) != null) {
           (<HTMLInputElement>document.getElementById(wishlist2)).style.color = "gray";

          
         }
        //alert("Successfully Removed your Wishlist")
        }
     }
      );
  }

  }
}


showloginSuccess() {
  console.log("login message");

  //this.toastr.success('Added Successfully to Wishlist');

      //
}
slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }

userloggedin(shopid :number,model_id:any)
  {
    if(!this.userroleSes)
    {
      this.eventEmitterService.onFirstComponentButtonClick();
     // alert("please login");
    }
    else
    {
      console.log(shopid);
      this.router.navigate(['/onlinebooking/'+shopid+"#"+model_id]);
    }
  }
  slideConfig1 = {"slidesToShow": 4, "slidesToScroll": 1};

  slickInit1(e:any) {
    console.log('slick initialized');
  }

  breakpoint1(e:any) {
    console.log('breakpoint');
  }

  afterChange1(e:any) {
    console.log('afterChange');
  }

  beforeChange1(e:any) {
    console.log('beforeChange');
  }
  private adjustsItemsPerSlide() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.mobileBreakpoint) {
      this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
      this.slideConfig1={"slidesToShow": 1, "slidesToScroll": 1};
    } else {
      this.slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
      this.slideConfig1={"slidesToShow": 4, "slidesToScroll": 1};
    }
  }


  getholidaysForAll() {
        
    this.restApi.getholidaysForAll().subscribe((res)=>{
      this.ShopHolidaysDetails = res
   
      this.ShopHolidaysDetails1 = this.ShopHolidaysDetails;
      console.log("ShopHolidaysDetails1>>>",this.ShopHolidaysDetails1);
     this.MoveShopHoliday();
      this.MoveShopOfferHoliday();
    }
    );
  }

  customerWhislist(customerId:any)
  {
    var whislist : [];
    let selectedcity=localStorage.getItem('selectedCity');

    return this.restApi.getCustomerWhislist(customerId,selectedcity).subscribe((data: {}) => {
      // alert(data)
      this.CustomerWhislistData = data;
      this.CustomerWhislistData1= this.CustomerWhislistData.data;

      console.log("whislist",this.CustomerWhislistData1);
      // this.dtTrigger.next();
      this.MoveWishlistCheck();
      this.MoveWishlistOfferCheck();
    })

  }

  MoveShopHoliday() {
    console.log("val first>>>>",this.ShopHolidaysDetails1);
    if(this.ShopHolidaysDetails1 != undefined) {
    for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {

      for(var j=0;j < (this.dashboardShop1.length);j++) {
        if(this.dashboardShop1[j].shop_id == this.ShopHolidaysDetails1[i].shop_id){
          if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
          var newNum = "leavecheck";
          var newVal = "Closed";
          this.dashboardShop1[j][newNum] = newVal;
}
        }
        
        console.log("val",this.dashboardShop1);
        // this.datecheckArr.push(ShopHolidaysDetails1[i])
       
      }

    }
  }
  }

  MoveShopOfferHoliday() {
    //console.log("val first>>>>",this.ShopHolidaysDetails1);
    if(this.ShopHolidaysDetails1 != undefined) {
    for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {

      for(var j=0;j < (this.dashboardShopoffer1.length);j++) {
        if(this.dashboardShopoffer1[j].shop_id == this.ShopHolidaysDetails1[i].shop_id){
          if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
          var newNum = "leavecheck";
          var newVal = "Closed";
          this.dashboardShopoffer1[j][newNum] = newVal;
}
        }
        //console.log("val offers",this.dashboardShopOffer1);
      }

    }
  } 
    console.log("dashboardShopoffer1>>>",this.dashboardShopoffer1);
  }

  

  MoveWishlistCheck() {
    //console.log("after ws val",this.dashboardShop1);
    if(this.CustomerWhislistData1 != undefined) {
    for(var i=0;i < this.CustomerWhislistData1.length;i++) {

      for(var j=0;j < (this.dashboardShop1.length);j++) {
        if(this.dashboardShop1[j].shop_id == this.CustomerWhislistData1[i].whislist){
          var newNum = "wishlistcheck";
          var newVal = "Yes";
          this.dashboardShop1[j][newNum] = newVal;
        }
        
      }

    }
  }
    console.log("val1>>>",this.dashboardShop1);
  }

  MoveWishlistOfferCheck() {
    //console.log("after ws val",this.dashboardShop1);
    if(this.CustomerWhislistData1 != undefined) {
    for(var i=0;i < this.CustomerWhislistData1.length;i++) {

      for(var j=0;j < (this.dashboardShopoffer1.length);j++) {
        if(this.dashboardShopoffer1[j].shop_id == this.CustomerWhislistData1[i].whislist){
          var newNum = "wishlistcheck";
          var newVal = "Yes";
          this.dashboardShopoffer1[j][newNum] = newVal;
        }
        
      }

    }
  }
    console.log("MoveWishlistOfferCheck>>>",this.dashboardShopoffer1);
  }


  checkModelAvail2(model_name:any) {
    this.toastr.error("Add your "+ model_name + " in your profile sectoin and continue booking");
  }
  }
