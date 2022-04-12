import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RestApiService } from "../shared/rest-api.service";
import { Router,ActivatedRoute,ParamMap, Params, NavigationEnd  } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';
import { HttpClient } from '@angular/common/http';
import { style } from '@angular/animations';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { ToastrService } from 'ngx-toastr';
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  apiurlforhtm = config_url;
  date:any;
  //data: any;
  selectedCity: any;
  dashboardShop:any;
  dashboardShop1:any;
  dashboardShopOffer:any;
  dashboardShopOffer1:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  CustomerWhislistData:any;
  CustomerWhislistData1:any;
  customerId:any;
  selectedcity:any;
  param1: string;
param2: string;
wishlistdata: any;
wishlistdata1: any;

ShopHolidaysDetails:any;
ShopHolidaysDetails1:any;
  // route: any;

  private innerWidth: number;
  private mobileBreakpoint = 480;
  itemsPerSlide = 3;

  counter:any =0;
  counter1:any = true;
  constructor(private toastr: ToastrService,public restApi: RestApiService,public datepipe: DatePipe,private route:ActivatedRoute,private router:Router,private eventEmitterService: EventEmitterService,private http: HttpClient) { }
  currentUsername = localStorage.getItem('currentUsername');

  userroleSes = localStorage.getItem('userroleSes');
  carDetailsById:any;
  carDetailsById1:any;
  date1:any;
  currenttime:any;
  ngOnInit(): void {

    this.adjustsItemsPerSlide();
    this.date1=new Date();
    this.date=new Date();
    this.date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.currenttime = this.datepipe.transform(this.date1, 'HH:mm');
    this.loadMasterService();
    // alert("hi")
    this.dashboardShopDetailByOffer();
    // this.cdr.detectChanges();
    // this.getholidaysForAll();
    // this.MoveShopHoliday();
    this.dashboardShopList();

  //   this.customerId= localStorage.getItem('currentUserId');
  //  console.log(this.customerId);
  //   if(this.customerId != null)
  //   {
  //   this.customerWhislist(this.customerId);
  //   }
    

this.adjustsItemsPerSlide();


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
  loadMasterService(){

    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;

      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })


  }

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

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
  dashboardShopList(){
    var cityid:any;
    cityid = localStorage.getItem('selectedCity');
    if(cityid == null ){
      cityid = 3;
    }
    // alert(cityid)
    return this.restApi.dashboardShop(cityid).subscribe((data: {}) => {
      // alert(data)
      this.dashboardShop = data;
      this.dashboardShop1 = this.dashboardShop.data.dashboardShopList;
      console.log("data dashboard>>>",this.dashboardShop1);
      this.getholidaysForAll();

      this.customerId= localStorage.getItem('currentUserId');
   console.log(this.customerId);
    if(this.customerId != null)
    {
    this.customerWhislist(this.customerId);
    }
      
    })
  }


  dashboardShopDetailByOffer(){
    var cityid:any;
    cityid = localStorage.getItem('selectedCity');
    if(cityid == null ){
      cityid = 3;
    }
    // alert(cityid)
    return this.restApi.dashboardShopDetailsByOffer(cityid).subscribe((data: {}) => {
      // alert(data)
      this.dashboardShopOffer = data;
      this.dashboardShopOffer1 = this.dashboardShopOffer.data.dashboardShopDetailsByOffer;
      console.log("dashboard>>>",this.dashboardShopOffer1);

      this.getholidaysForAll();
      this.loadcarDetailsById();
    })
  }




  slideConfig1 = {"slidesToShow": 4, "slidesToScroll": 4};

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

clickEvent(shopid :number,action:any){
  if(!this.userroleSes)
    {
      this.eventEmitterService.onFirstComponentButtonClick();
     // alert("please login");
    }
    else {
         //alert(action)
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


      private adjustsItemsPerSlide() {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < this.mobileBreakpoint) {
          this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 4};
          this.slideConfig1={"slidesToShow": 1, "slidesToScroll": 4};
        } else {
          this.slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
          this.slideConfig1={"slidesToShow": 4, "slidesToScroll": 4};
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
              // alert(this.dashboardShop1[j].model_id);
              var newNum = "modelAvail";
              var newVal = "Available";
              this.dashboardShop1[j][newNum] = newVal;
            }
            
            //console.log("val",this.dashboardShop1);
            // this.datecheckArr.push(ShopHolidaysDetails1[i])
           
          }

        }
      }


        
        console.log("car avl>>>",this.dashboardShop1);
      }


      MovecarDetForOffer() {
        
        if(this.carDetailsById1 != undefined) {
        for(var i=0;i < this.carDetailsById1.length;i++) {

          for(var j=0;j < (this.dashboardShopOffer1.length);j++) {
            if(this.dashboardShopOffer1[j].model_id == this.carDetailsById1[i].model){
              // alert(this.dashboardShop1[j].model_id);
              var newNum = "modelAvail";
              var newVal = "Available";
              this.dashboardShopOffer1[j][newNum] = newVal;
            }
            
            //console.log("val",this.dashboardShop1);
            // this.datecheckArr.push(ShopHolidaysDetails1[i])
           
          }

        }
      }


        
        console.log("car avl dashboardShopOffer1>>>",this.dashboardShopOffer1);
      }

    

      datecheckArr = new Array();
      MoveShopHoliday() {
        console.log("val first>>>>",this.ShopHolidaysDetails1);
        if(this.ShopHolidaysDetails1 != undefined) {
        for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {

          for(var j=0;j < (this.dashboardShop1.length);j++) {
            if(this.dashboardShop1[j].shop_id == this.ShopHolidaysDetails1[i].shop_id){
              // alert("current time>>"+this.currenttime)
              // alert("from>>"+this.ShopHolidaysDetails1[i].timing_from)
              // alert("to>>"+this.ShopHolidaysDetails1[i].timing_to)
              if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
  // alert("if")
  var newNum = "leavecheck";
              var newVal = "Closed";
              this.dashboardShop1[j][newNum] = newVal;
}
else
{
// alert("else") 
}
              
            }
            
            console.log("val after timing check",this.dashboardShop1);
            // this.datecheckArr.push(ShopHolidaysDetails1[i])
           
          }

        }
      }


        
        console.log("val1>>>",this.ShopHolidaysDetails1);
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
        console.log("val1>>>",this.ShopHolidaysDetails1);
      }


      MoveShopOfferHoliday() {
        //console.log("val first>>>>",this.ShopHolidaysDetails1);
        if(this.ShopHolidaysDetails1 != undefined) {
        for(var i=0;i < this.ShopHolidaysDetails1.length;i++) {

          for(var j=0;j < (this.dashboardShopOffer1.length);j++) {
            if(this.dashboardShopOffer1[j].shop_id == this.ShopHolidaysDetails1[i].shop_id){
              if (this.currenttime > this.ShopHolidaysDetails1[i].leave_timing_from	 && this.currenttime < this.ShopHolidaysDetails1[i].leave_timing_to)
{
              var newNum = "leavecheck";
              var newVal = "Closed";
              this.dashboardShopOffer1[j][newNum] = newVal;
}
            }
            //console.log("val offers",this.dashboardShopOffer1);
          }

        }
      } 
        console.log("final holiday dashboardShopOffer1>>>",this.dashboardShopOffer1);
      }


      MoveWishlistOfferCheck() {
        //console.log("after ws val",this.dashboardShop1);
        if(this.CustomerWhislistData1 != undefined) {
        for(var i=0;i < this.CustomerWhislistData1.length;i++) {

          for(var j=0;j < (this.dashboardShopOffer1.length);j++) {
            if(this.dashboardShopOffer1[j].shop_id == this.CustomerWhislistData1[i].whislist){
              var newNum = "wishlistcheck";
              var newVal = "Yes";
              this.dashboardShopOffer1[j][newNum] = newVal;
            }
            
          }

        }
      }
        console.log("MoveWishlistOfferCheck>>>",this.dashboardShopOffer1);
      }

      checkModelAvail2(model_name:any) {
        this.toastr.error("Add your "+ model_name + " in your profile sectoin and continue booking", '', {
          timeOut: 5000,
        });
      }

      

}
