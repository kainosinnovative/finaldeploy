import { Component, OnInit, ElementRef,VERSION, ViewChild } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
//import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute,ParamMap, Params, NavigationEnd  } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { config_url } from '../shared/customer/constant';
import { ToastrService } from 'ngx-toastr';
import { pick } from 'highcharts';
import { yearsPerPage } from '@angular/material/datepicker';

@Component({
  selector: 'app-onlinebooking',
  templateUrl: './onlinebooking.component.html',
  styleUrls: ['./onlinebooking.component.scss'],
  providers: [DatePipe]
})
export class OnlinebookingComponent implements OnInit {
  apiurlforhtm = config_url;
  private innerWidth: number;
  private mobileBreakpoint = 480;
  show: boolean = true
  opened = true;
  opened1 = true;
  displaydata: any;
  displaydata1: any;
  onlinebooking: any;
  brandtype: any;
  branddata: any;
  selectedDeviceObj: any;
  myusername: any;
  carmodelsdata:any;
  modelsdata: any;
  selecttypedata: any;
  myuser: any;
  CustomerDataById: any;
  CustomerDataById1: any;
  date: any;
  shopdetails: any;
  shopdetails1: any;
  offerdetails: any;
  offerslist: any;
  MasterServiceid: any;
  MasterServiceid1: any;
  getPickupAvlData:any;
  getPickupAvlData1:any;
  getPickupAvlData2:any;
   public totalvalue : number=0;
   public finalvalue : number=0;
//totalvalue = 0;
carDetailsById:any;
carDetailsById1:any;
carDetailsById2:any;
carDetailsById3:any;
current_date:any;
current_date1:any;
OnlineBookingInsert:any;
carinfoModels:any;
carinfoModels1:any;
counter:any = 0;
date2:any;
  currentUsername = localStorage.getItem('currentUsername');
 isloggedinUser = localStorage.getItem('isloggedinUser');
 ShopProfileDetailsLogo:any;
 ShopProfileDetailsName:any;
 ProfileDataByIdObject:any;
 ShopProfileDetails:any;
 pickup_dateid: any;
 drop_dateid: any;

 public text: string = 'Select';

 public textcontent: string = 'Select';


  constructor(
    public restApi: RestApiService,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public datepipe: DatePipe,
    private router: ActivatedRoute,
    private  router1:  Router,
    // private  router:  Router,
    private toastr: ToastrService
  ) {  }





  ngOnInit(): void {

  // (<HTMLInputElement>document.getElementById("pickup_time")).disabled =true;
    this.date2=new Date();
    this.date2 =this.datepipe.transform(this.date2, 'yyyy-MM-dd');

    this.adjustsItemsPerSlide();
    // (<HTMLInputElement>document.getElementById("movetopid")).scrollTop=0;
    (<HTMLInputElement>document.getElementById("booking_date")).focus();

    this.date=new Date();
     this.current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
     let currentUserId = localStorage.getItem('currentUserId');
     let userroleSes = localStorage.getItem('userroleSes');


    this.displaycartype();
    this.loadcarbrand();
    this.readCustomerDataById();
    // this.loadshopdetails();
    this.loadcarDetailsById();
    this.idbyMasterService();



    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    const zerocheck = '^0{1}$';
    this.onlinebooking = this.frmbuilder.group({
      Booking_id: ['', Validators.required],
       services: [],
      combo_id: [],
      Customer_id: [currentUserId, Validators.required],
      instructions: [],
      bookingdate: ['', Validators.required],
      // model_id: ['', Validators.required],
      payable_amt:['', [Validators.required]],
      serviceprice_total: [],
      comboprice_total: [],
      Shop_id: [],
      lastupddt: [this.current_date, [Validators.required]],
      vehicle_number: ['', Validators.required],
      pickup_drop: [],
      pickup_date: [],
      pickup_time: [],
      drop_date: [],
      drop_time: [],
      payment_type:[],
      last_upd_by: [userroleSes, [Validators.required]],
       })


       this.router.params.subscribe(params => {
        const id2 = params['id'];
        const idArr = id2.split("#");
        let id = idArr[0];
        //alert(idArr[1]);
        this.loadshopdetails(id,idArr[1]);
        this.loadshopoffers(id,idArr[1]);
        this.getPickupAvl(id);
        this.loadcarDetByModelId(idArr[1]);
        var randomnumber = Math.floor(100000 + Math.random() * 900000) + "-" + id;
        this.onlinebooking.controls.Booking_id.setValue(randomnumber);
        this.onlinebooking.controls.Shop_id.setValue(id);
        this.onlinebooking.controls.pickup_drop.setValue(false);
        this.onlinebooking.controls.payment_type.setValue("Cash On Delivery");
        this.getshopProfileDataByIdBooking(id);
        this.onlinebooking.controls.bookingdate.setValue(this.current_date);


  })
  let pickup_drop = this.onlinebooking.get('pickup_drop').value;

  if(pickup_drop==false)
  {
  // alert(pickup_drop);
   this.onlinebooking.get('pickup_date').disable();
   this.onlinebooking.get('pickup_time').disable();
   this.onlinebooking.get('drop_date').disable();
   this.onlinebooking.get('drop_time').disable();
   this.onlinebooking.get('instructions').disable();

  }
  }

  loadcarDetByModelId(model_id:any){
    let currentUserId = localStorage.getItem('currentUserId');
    var carDetByModelId =
                   {
                  "model": model_id,
                  "currentUserId": currentUserId,
                   }


    return this.restApi.carDetByModelId(carDetByModelId).subscribe((data: {}) => {
      // alert(data)
      this.carDetailsById2 = data;
      this.carDetailsById3 = this.carDetailsById2.data.carDetByModelId;
      console.log("carDetailsById3>>>",this.carDetailsById3);
    })
  }

  getshopProfileDataByIdBooking(id:any) {

    // let currentShopId = localStorage.getItem('currentUserId');
    return this.restApi.readShopProfileDataById(id).subscribe((res)=>{
      this.ProfileDataByIdObject = res


      this.ShopProfileDetails = this.ProfileDataByIdObject.data.profile
      this.ShopProfileDetailsLogo = this.ShopProfileDetails.shop_logo;
      this.ShopProfileDetailsName = this.ShopProfileDetails.name;
      //console.log("this.ShopProfileDetails>>>",this.ShopProfileDetails.shop_logo)

    }


    )

  }


  private adjustsItemsPerSlide() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.mobileBreakpoint) {
      this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
      this.slideConfig1={"slidesToShow": 1, "slidesToScroll": 1};
    } else {
      this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
      this.slideConfig1={"slidesToShow": 1, "slidesToScroll": 1};
    }
  }


  cartype(){
    console.log("hiiiii1111");
}

dropdatapicker(){

    let start_date = (<HTMLInputElement>document.getElementById("pickup_dateid")).value;
    let end_date = (<HTMLInputElement>document.getElementById("drop_dateid")).value;

    (<HTMLInputElement>document.getElementById("enddate_message1")).style.display ="none";

    // (<HTMLInputElement>document.getElementById("enddate_message2")).style.display ="none";


    if(end_date < start_date) {

      // alert("if");
     if(end_date !== ""){
      (<HTMLInputElement>document.getElementById("enddate_message1")).style.display ="block";
     }
    }
   else if(start_date > end_date) {
    // alert("if");
   if(end_date !== ""){

    (<HTMLInputElement>document.getElementById("enddate_message1")).style.display ="block";

   }
  }

   else {
      // alert("else");
      (<HTMLInputElement>document.getElementById("enddate_message1")).style.display ="none";

      // (<HTMLInputElement>document.getElementById("enddate_message2")).style.display ="none";
    }
}

// pickupdatapicker(){

//   let start_date = (<HTMLInputElement>document.getElementById("pickup_dateid")).value;
//     let end_date = (<HTMLInputElement>document.getElementById("drop_dateid")).value;

//     (<HTMLInputElement>document.getElementById("enddate_message2")).style.display ="none";

//     if(end_date < start_date) {
//       // alert("if");

//       (<HTMLInputElement>document.getElementById("enddate_message2")).style.display ="block";
//     }
//     else{

//        (<HTMLInputElement>document.getElementById("enddate_message2")).style.display ="none";
//     }
// }

getPickupAvl(currentShopId:any) {

  // let currentShopId = localStorage.getItem('currentUserId');
  return this.restApi.readShopProfileDataById(currentShopId).subscribe((res)=>{
    this.getPickupAvlData = res


    this.getPickupAvlData1 = this.getPickupAvlData.data.profile;
    this.getPickupAvlData2 = this.getPickupAvlData1.is_pickup_drop_avl;


    console.log("getPickupAvl>>>",this.getPickupAvlData1.is_pickup_drop_avl)

  }


  )

}

displaycartype(){


  return this.restApi.getcartype().subscribe((cartypedata: {}) => {
    // alert(data)
    this.displaydata = cartypedata;
    this.displaydata1 = this.displaydata.data.type;

    console.log("data>>>>",this.displaydata1)
  })
}

loadcarbrand(){


  return this.restApi.getcarbrand().subscribe((carbranddata: {}) => {
    // console.log(carbranddata);
     //console.log(hi)
    this.brandtype = carbranddata;
    this.branddata = this.brandtype.data.type;

    console.log("data>>>>",this.branddata)
  })
}

onChangeObj(newObj: any) {
  console.log(newObj);


  this.selectedDeviceObj = newObj;

  (<HTMLInputElement>document.getElementById("model")).value='';
  this.myusername = (<HTMLInputElement>document.getElementById("cartype")).value;
  console.log(this.myusername);



  // ... do other stuff here ...

  this.http.get(config_url+'/app/model?cartype='+this.myusername+
'&brand='+this.selectedDeviceObj).subscribe(
data => {
  //alert(data)
  console.log(data);
  this.carmodelsdata = data
  this.modelsdata = this.carmodelsdata.data.type;
},
error => {
  // alert(error)
  console.log(error.status)
 // if(error.status == "200") {
    //this.showsuccess();
   // this.pagerefresh();
 // }
}
);
}

onchangecartype(typedata: any) {
  console.log(typedata);


  this.selecttypedata = typedata;

  (<HTMLInputElement>document.getElementById("model")).value='';
  this.myuser = (<HTMLInputElement>document.getElementById("carbrand")).value;
  console.log(this.myuser);



  // ... do other stuff here ...

  this.http.get(config_url+'/app/model?brand='+this.myuser+
'&cartype='+this.selecttypedata).subscribe(
data => {
  //alert(data)
  console.log(data);
  this.carmodelsdata = data
  this.modelsdata = this.carmodelsdata.data.type;
},
error => {
  // alert(error)
  console.log(error.status)

}
);
}

readCustomerDataById() {

  let currentUserId = localStorage.getItem('currentUserId');

  return this.restApi.readCustomerDataById(currentUserId).subscribe((res)=>{
    this.CustomerDataById = res


    this.CustomerDataById1 = this.CustomerDataById.data.profile
    console.log(this.CustomerDataById);

  }


  )

}

loadshopdetails(shopid:any,model_id:any){
// alert(shopid)
// alert(shopid)
  var ServiceDataOnlineBookingModel =
                   {
                  "model": model_id,
                  "shopid": shopid,
                   }

  return this.restApi.getServiceDataOnlineBookingModel(ServiceDataOnlineBookingModel).subscribe((data: {}) => {
    // alert(data)
    this.shopdetails = data;
    //console.log("abi", this.shopdetails);
     this.shopdetails1 = this.shopdetails.data.getServiceDataOnlineBookingModel;

     console.log("shopdetails1 final>>>>",this.shopdetails1)

  })
}

loadshopoffers(shopid:any,modelid:any){

  var onlinebookingcombo =
                   {
                  "model": modelid,
                  "shopid": shopid,
                   }

  return this.restApi.ShopoffersById(onlinebookingcombo).subscribe((data: {}) => {

    //console.log('testabi', data);

    this.offerdetails = data;
    this.offerslist = this.offerdetails.data.OnlineBookingShopDetails;
    console.log("shop_logo>>>>",this.offerslist)

  })

}
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

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



changeBgColor(offer_id:any){

  let offer_totalid = "offerprice_" + offer_id ;
  // alert(offer_totalid);
   var offer_amt: number;
    let  buttonid="select_"+ offer_id;
// alert(buttonid)
    let buttontext =  (<HTMLInputElement>document.getElementById(buttonid)).innerHTML;

      if(buttontext === 'Select') {
        // alert(this.counter);

        if(this.counter < 1) {
          this.counter = this.counter + 1;

        (<HTMLInputElement>document.getElementById(buttonid)).innerHTML = "Selected";
      (<HTMLInputElement>document.getElementById(buttonid)).style.backgroundColor = "#1872f2";
      // (<HTMLInputElement>document.getElementById(buttonid)).style.fontWeight = "bold";
       offer_amt = Number((<HTMLInputElement>document.getElementById(offer_totalid)).value);
        //alert(offer_amt);
        this.finalvalue = this.finalvalue +(offer_amt);
        // (<HTMLInputElement>document.getElementById("finalamount")).value = this.finalvalue.toFixed();
        this.onlinebooking.controls.comboprice_total.setValue(this.finalvalue.toFixed());
        }
        else {
          // alert("two");
          this.toastr.error('Select only one combo offer');
        }
      } else {
        // alert("selected");
        this.counter = this.counter - 1;
        // alert("count else>>"+this.counter);
      (<HTMLInputElement>document.getElementById(buttonid)).innerHTML = "Select";
      (<HTMLInputElement>document.getElementById(buttonid)).style.backgroundColor = "#1872f2";
       offer_amt = Number((<HTMLInputElement>document.getElementById(offer_totalid)).value);
       this.finalvalue = this.finalvalue -(offer_amt);
       this.onlinebooking.controls.comboprice_total.setValue(this.finalvalue.toFixed());
      //  (<HTMLInputElement>document.getElementById("finalamount")).value = this.finalvalue.toFixed();
  }
}
ExtraServiceArr = new Array();
ExtraServiceArr1 = new Array();
selectbuttoncolor(service_id:any,indexval:any){

 //alert(service_id);

  let service_totalid = "amount_" + service_id;


 let  currentserviceid ="chooice_"+ service_id;
  let selecttext =  (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML;

 // alert(selecttext);

      if(selecttext === 'Select') {
        (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML = "Selected "+ "<i  class='fa fa-check'></i>";
       (<HTMLInputElement>document.getElementById(currentserviceid)).style.backgroundColor = "#1872f2";
      //  (<HTMLInputElement>document.getElementById(currentserviceid)).style.fontWeight = "bold";
       var service_amt = Number((<HTMLInputElement>document.getElementById(service_totalid)).value);
       console.log(service_amt);
      this.totalvalue = this.totalvalue +(service_amt);
      console.log(this.totalvalue);
      // (<HTMLInputElement>document.getElementById("totalamount")).value =  this.totalvalue.toFixed();
      this.onlinebooking.controls.serviceprice_total.setValue(this.totalvalue.toFixed());

       } else {

     (<HTMLInputElement>document.getElementById(currentserviceid)).innerHTML = "Select";
     (<HTMLInputElement>document.getElementById(currentserviceid)).style.backgroundColor = "#1872f2";
     var service_amt = Number((<HTMLInputElement>document.getElementById(service_totalid)).value);
     this.totalvalue = this.totalvalue -(service_amt);
    //  (<HTMLInputElement>document.getElementById("totalamount")).value =  this.totalvalue.toFixed();
    this.onlinebooking.controls.serviceprice_total.setValue(this.totalvalue.toFixed());
 }

 var concatServiceid_amount2 =  service_id + "#" + service_totalid;

 if(this.ExtraServiceArr.includes(concatServiceid_amount2)){
  this.ExtraServiceArr = this.remove1(this.ExtraServiceArr, concatServiceid_amount2);
}
else {
  this.ExtraServiceArr.push(concatServiceid_amount2);
}

 var arrayLength1 = this.ExtraServiceArr.length;

 this.ExtraServiceArr1 = new Array();
 for (var i = 0; i < arrayLength1; i++) {
   var splitArr = this.ExtraServiceArr[i].split("#");


   //Do something
   this.ExtraServiceArr1.push(splitArr[0]);
  //  this.ComboPrimaryIdArr.push(splitArr[0]);

}
this.onlinebooking.controls.services.setValue(this.ExtraServiceArr1.toString());

// var extraserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("totalamount")).value);
let extraserviceTotalAmount = Number(this.onlinebooking.get('serviceprice_total').value);
    // var comboserviceTotalAmount = Number((<HTMLInputElement>document.getElementById("finalamount")).value);
    let comboserviceTotalAmount = Number(this.onlinebooking.get('comboprice_total').value);
    let FinAmount = extraserviceTotalAmount + comboserviceTotalAmount;
    // (<HTMLInputElement>document.getElementById("final_totalamount")).value = FinAmount.toString();
    this.onlinebooking.controls.payable_amt.setValue(FinAmount.toString());

}

idbyMasterService(){

  return this.restApi.getMasterService().subscribe((data: {}) => {
    // alert(data)
    this.MasterServiceid = data;
    this.MasterServiceid1 = this.MasterServiceid.data.type;

    console.log("aravind>>>>",this.MasterServiceid1)
    // this.dtTrigger.next();

  })


}
ComboServiceArr = new Array();
ComboServiceArr1 = new Array();
ComboPrimaryIdArr = new Array();
getComboOfferDetails(Comboserviceid:any,Comboservice_amount:any,Comboservice_Offername:any) {
  var concatServiceid_amount =  Comboserviceid + "#" + Comboservice_Offername;

  let checkmarkicon = "checkmarkicon_" + Comboserviceid;
  // alert(checkmarkicon);

    if(this.ComboServiceArr.includes(concatServiceid_amount)){
      // this.changeBgColor(Comboserviceid);
      this.ComboServiceArr = this.remove(this.ComboServiceArr, concatServiceid_amount);
      (<HTMLInputElement>document.getElementById(checkmarkicon)).style.display="none";
    }
    else {
      let arrayLength = this.ComboServiceArr.length;
      // if
    if(arrayLength < 1){
      // this.changeBgColor(Comboserviceid);
      this.ComboServiceArr.push(concatServiceid_amount);
      (<HTMLInputElement>document.getElementById(checkmarkicon)).style.display="block";
    }
    }

    var arrayLength = this.ComboServiceArr.length;
    // alert(arrayLength)
    this.ComboServiceArr1 = new Array();
    this.ComboPrimaryIdArr = new Array();
    for (var i = 0; i < arrayLength; i++) {
      var splitArr = this.ComboServiceArr[i].split("#");


      //Do something
      this.ComboServiceArr1.push(splitArr[1]);
      this.ComboPrimaryIdArr.push(splitArr[0]);

  }

this.onlinebooking.controls.combo_id.setValue(this.ComboPrimaryIdArr.toString());
    // (<HTMLInputElement>document.getElementById("offernameShow")).innerText = this.ComboServiceArr1.toString();


    let extraserviceTotalAmount = Number(this.onlinebooking.get('serviceprice_total').value);
    let comboserviceTotalAmount = Number(this.onlinebooking.get('comboprice_total').value);
    let FinAmount = extraserviceTotalAmount + comboserviceTotalAmount;
    this.onlinebooking.controls.payable_amt.setValue(FinAmount.toString());

}


remove(arr:any, item:any)
{
    var index = this.ComboServiceArr.indexOf(item);
    return [

        // part of the array before the given item
        ...this.ComboServiceArr.slice(0, index),

        // part of the array after the given item
        ...this.ComboServiceArr.slice(index + 1)
    ];
}


remove1(arr:any, item:any)
{
    var index = this.ExtraServiceArr.indexOf(item);
    return [

        // part of the array before the given item
        ...this.ExtraServiceArr.slice(0, index),

        // part of the array after the given item
        ...this.ExtraServiceArr.slice(index + 1)
    ];
}





slideConfig1 = {"slidesToShow": 1, "slidesToScroll": 1};

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


  loadcarDetailsById(){

    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.CarDetailsById(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.carDetailsById = data;
      this.carDetailsById1 = this.carDetailsById.data.CarDetailsByCustomerId;
      console.log("carDetailsById1>>>",this.carDetailsById1)
    })
  }


  OnlineBooking(onlinebooking:any) {

    let payable_amt = this.onlinebooking.get('payable_amt').value;

    let pickup_drop = this.onlinebooking.get('pickup_drop').value;

    let pickup_date = this.onlinebooking.get('pickup_date').value;
    let instructions = this.onlinebooking.get('instructions').value;
    
    let pickup_time = this.onlinebooking.get('pickup_time').value;


    let drop_date = this.onlinebooking.get('drop_date').value;
    // alert(drop_date)
    let drop_time = this.onlinebooking.get('drop_time').value;

    if(pickup_drop == true && instructions == '') {

      (<HTMLInputElement>document.getElementById("instructions")).focus();
    this.toastr.error('Enter Pickup & Drop Instructions');

  }
  // 
    else if(pickup_drop == true && pickup_date == '') {

        (<HTMLInputElement>document.getElementById("pickup_dateid")).focus();
      this.toastr.error('Select pickup date');

    }
    // pickdate -yes ,time - no
    else if(pickup_drop == true && pickup_date != null && pickup_time == '') {

      (<HTMLInputElement>document.getElementById("pickup_timeid")).focus();
    this.toastr.error('Select pickup time');

  }
// pick time - yes - date - no
  else if(pickup_drop == true && pickup_time  != null && pickup_date == '') {

    (<HTMLInputElement>document.getElementById("pickup_dateid")).focus();
  this.toastr.error('Select pickup date');

}

  // dropdate - yes, time - no

  else if(pickup_drop == true && drop_date != "" && drop_time == '') {

    (<HTMLInputElement>document.getElementById("drop_time")).focus();
  this.toastr.error('Select drop time');

}
//  dropdate - no, time - yes
else if(pickup_drop == true && drop_time  != "" && drop_date == '') {

  (<HTMLInputElement>document.getElementById("pickup_dateid")).focus();
this.toastr.error('Select drop date');

}

    else if(payable_amt == "" || payable_amt == 0){
      this.toastr.error('Please select any service for your car');
    }
    else {

    this.http.post(config_url+'/shop/addonlinebooking',onlinebooking)
      .subscribe(res => {
      console.log("res>>>>>",res);
      }, (err) => {
        console.log("err>>>>>",err);
        if(err.status == 200) {
          this.toastr.success('Booking request submitted');
          this.router1.navigate(['/MyBooking']);
          window.setTimeout(function(){location.reload()},100)

        }
    });
  }
// this.restApi.OnlineBookingInsertFn(onlinebooking).subscribe((data: {}) => {

//   this.OnlineBookingInsert = data;

// })
  }


  vehicleBasedModel(newObj: any) {
  //   let vehicle_number : any = newObj.target.value;

  //   this.restApi.vehicleBasedModel(vehicle_number).subscribe((data: any) => {
  //     console.log('POST Request is successful >>>>>>>>', data.status);
  //     if(data.status == "pass") {
  //       this.carinfoModels = data
  // this.carinfoModels1 = this.carinfoModels.data;
  //     }
  //   },
  //   success => {
  //     console.log('Error>>>>>', success);

  //   }
  //   );

  }

  disabledPickupDetails() {
   // alert(term);
    let pickup_drop = this.onlinebooking.get('pickup_drop').value;
   // alert(pickup_drop)

    this.onlinebooking.controls.pickup_date.setValue("");
    this.onlinebooking.controls.instructions.setValue("");
    this.onlinebooking.controls.pickup_time.setValue("");
    this.onlinebooking.controls.drop_date.setValue("");
    this.onlinebooking.controls.drop_time.setValue("");

    let start_date = (<HTMLInputElement>document.getElementById("pickupdateTdid")).value;
    let end_date = (<HTMLInputElement>document.getElementById("droptimetdid")).value;
    if(start_date > end_date) {
      // alert(start_date))
    //  alert(2);
      (<HTMLInputElement>document.getElementById("enddate_message1")).style.display ="block";
    }

  if(pickup_drop == true) {
    //alert(pickup_drop);
    this.onlinebooking.get('pickup_date').enable();
    this.onlinebooking.get('pickup_time').enable();
    this.onlinebooking.get('drop_date').enable();
    this.onlinebooking.get('drop_time').enable();
    this.onlinebooking.get('instructions').enable();

   }
   else {
    this.onlinebooking.get('pickup_date').disable();
    this.onlinebooking.get('pickup_time').disable();
    this.onlinebooking.get('drop_date').disable();
    this.onlinebooking.get('drop_time').disable();
    this.onlinebooking.get('instructions').disable();
     }


  }

  disableDate(){
    return false;
} 


}


