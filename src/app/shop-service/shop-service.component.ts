import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-shop-service',
  templateUrl: './shop-service.component.html',
  styleUrls: ['./shop-service.component.scss'],
  providers: [DatePipe]
})
export class ShopServiceComponent implements  OnInit{
  keyword = 'service_name';
  offerpricetext:any;
  serviceData: any;
  serviceData1: any;
  opened = true;
  opened1 = true;
  element: HTMLElement;
  service_amount: string;
   date:any;
  config: any;
   current_date:any;
   MasterServiceData:any;
   MasterServiceData1:any;
   MasterModelData:any;
   MasterModelData1:any;
   shopserviceForm:any;
   MasterserviceForm:any;
   citytype:any;
   citytype1:any;
   myservice:any;
   servicemodelsdata:any;
   servicemodelsdataobj:any;
   ProfileDataByIdObject:  any;
   ShopProfileDetails: any;
   statuspickupvalue: any;

  rateControl: FormControl;
  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService,private toastr: ToastrService,public datepipe: DatePipe,
    private frmbuilder: FormBuilder) { }


  ngOnInit(): void {
    

    (<HTMLInputElement>document.getElementById("autofocus2")).focus();

    this.date=new Date();
    this.current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.loadServiceData();
    this.loadMasterService();
    this.loadAllModels();
    this.readProfileDataById();

    let currentUserId:any = localStorage.getItem('currentUserId');
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count


    };



    this.shopserviceForm = this.frmbuilder.group({
      service_id: ['', Validators.required],
      model_id: ['', Validators.required],
      lastupddt: [this.current_date, Validators.required],
      actual_amount: ['', Validators.required],
      shop_id:[currentUserId, Validators.required],
      status:['1', Validators.required]
      // hidden_service: [''],
    }
    )


    this.MasterserviceForm = this.frmbuilder.group({
      service_name: ['', Validators.required],
     // model_id: ['', Validators.required],
      shop_id:[currentUserId, Validators.required],
      //actual_amount: ['', Validators.required],
      lastupddt: [this.current_date, Validators.required],

    }
    )

  }


  pageChanged(event:any){
    this.config.currentPage = event;
  }




  loadServiceData(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceData(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceData = data;
      this.serviceData1 = this.serviceData.data.carAndShopservice;

      console.log("car>>>",this.serviceData1)
      // this.dtTrigger.next();
    })


  }


  AddServiceAmount(obj:any) {

    // alert(obj)
    let service_amountid = "amount_"+obj;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).value;
    console.log(service_amount);
    let currentUserId = localStorage.getItem('currentUserId');
// alert(service_amount)
    if(service_amount != "") {
// alert("in")

    let addbtn = "addbtn_"+obj;
    (<HTMLInputElement>document.getElementById(addbtn)).remove();
    let updatebtn = "updatebtn_"+obj;
    (<HTMLInputElement>document.getElementById(updatebtn)).style.display="block";

    // var shopservAmount =
    //             {
    //               "serviceid": obj,
    //               "service_amount": service_amount,
    //               "currentUserId":currentUserId

    //               }

                  this.http.get(config_url+'/shop/AddshopService?service_amount='+service_amount +
                     "&serviceid=" + obj + "&currentUserId="+currentUserId).subscribe( data => {
                      console.log('POST Request is successful >>>>>>>>', data);

                  },
                  success => {
                      console.log('Error>>>>>', success.status);
                      if(success.status == 200) {
                        this.loadServiceData();
                      }
                  }


                     )

    // this.restApi.AddshopService(shopservAmount).subscribe((data => {
    //  console.log(">>>>>",data)
    // }
    // ));


    }
    else {
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }



  }

  UpdateServiceAmount(obj1:any,i:any) {
    let responsedata :any;
    let obj=obj1+'_'+i;
   // alert(obj);
    let servicename="servicename_"+obj;
   // alert(servicename);
    let service_amountid = "amount_"+obj;
    let service_amount = (<HTMLInputElement>document.getElementById(service_amountid)).value;
   // alert(service_amount);
    let service_name = (<HTMLInputElement>document.getElementById(servicename)).value;
   // alert(servicename);
    let model_id = (<HTMLInputElement>document.getElementById("model_"+obj)).value;
    let currentUserId = localStorage.getItem('currentUserId');

    if (Number(service_amount)  < 0){
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount1_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }
     else if(service_amount != "") {


                  this.http.get(config_url+'/shop/UpdateshopService?service_amount='+service_amount +
                     "&serviceid=" + obj1 + "&currentUserId="+currentUserId + "&modelId="+model_id) .subscribe((data => {
                     console.log(data);
                     responsedata=data;
                     if(responsedata.status =="pass")
                     {
                      this.toastr.success('Amount for ' +  service_name + ' Updated Successfully');
                      this.loadServiceData();
                     }
                     else{
                      this.toastr.success('Please Try Again');
                     }


                     }))
    }

    else {
      (<HTMLInputElement>document.getElementById(service_amountid)).focus();
      let validateamount = "validateamount_"+obj;
      (<HTMLInputElement>document.getElementById(validateamount)).style.display ="block";
    }

  }
  UpdateOfferAmount(obj1:any,i:any)
  {
    let obj=obj1+"_"+i;
    let validateoffer= "validateoffer_"+obj;
    let validateoffer1= "validateoffer1_"+obj;
    let validateoffer2= "validateoffer2_"+obj;
   (<HTMLInputElement>document.getElementById(validateoffer)).style.display ="none";
    let responsedata :any;
    let servicename="servicename_"+obj;
    let offer_percent = "offer_"+obj;
    let offer_amount="offeramount_"+obj;
    let offerfromdate="offerfromdate_"+obj;
    let offertodate="offertodate_"+obj
    let todateformat="validatetodateformat_"+obj;
    (<HTMLInputElement>document.getElementById(todateformat)).style.display ="none";
    let fromdateformat="validatefromdateformat_"+obj;
    (<HTMLInputElement>document.getElementById(fromdateformat)).style.display ="none";
    let offerpercentage = (<HTMLInputElement>document.getElementById(offer_percent)).value;
    let offeramount = (<HTMLInputElement>document.getElementById(offer_amount)).value;
    let service_name = (<HTMLInputElement>document.getElementById(servicename)).value;
    let model_id = (<HTMLInputElement>document.getElementById("model_"+obj)).value;
    let currentUserId = localStorage.getItem('currentUserId');
    let fromdate= (<HTMLInputElement>document.getElementById(offerfromdate)).value;
    let todate= (<HTMLInputElement>document.getElementById(offertodate)).value;
    let validatefromdateid= "validatefromdate_"+obj;
    (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="none";
    let validatetodateid= "validatetodate_"+obj;
    (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="none";
  if(Number(offerpercentage)  >99){
    console.log( "abi");
      (<HTMLInputElement>document.getElementById(offer_percent)).focus();

      (<HTMLInputElement>document.getElementById(validateoffer2)).style.display ="block";
    }

  else  if(Number(offerpercentage) != 0 && fromdate !="" && todate !="" ) {

                  if(todate<fromdate)
                  {
                    (<HTMLInputElement>document.getElementById(offertodate)).focus();

                    (<HTMLInputElement>document.getElementById(todateformat)).style.display ="block";
                  }

                  else
                  {
                  this.http.get(config_url+'/shop/Updateshopoffer?offer_amount='+offeramount +
                     "&serviceid=" + obj1 + "&modelId="+model_id +"&offerpercent="+offerpercentage + "&lastupddt="+this.current_date +
                      "&fromdate="+fromdate + "&todate="+todate +"&currentUserId="+currentUserId) .subscribe((data => {

                     responsedata=data;
                     if(responsedata.status=="pass")
                     {
                      this.toastr.success('Offer Price for ' +  service_name + ' Updated Successfully');
                      this.loadServiceData();
                     }
                     else{
                      this.toastr.success('Please Try Again');
                     }
                    this.loadServiceData();

                    }))
                  }
    }
    else if(offerpercentage!="" && fromdate === "" && todate === ""){
      (<HTMLInputElement>document.getElementById(offerfromdate)).focus();

      (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="block";
      (<HTMLInputElement>document.getElementById(offertodate)).focus();

      (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="block";
    }
    else if(offerpercentage!="" && fromdate != "" && todate === ""){

      (<HTMLInputElement>document.getElementById(offertodate)).focus();
      let validatetodateid= "validatetodate_"+obj;
      (<HTMLInputElement>document.getElementById(validatetodateid)).style.display ="block";
    }
    else if(offerpercentage!="" && fromdate === "" && todate != ""){

      (<HTMLInputElement>document.getElementById(offerfromdate)).focus();
      let validatefromdateid= "validatefromdate_"+obj;
      (<HTMLInputElement>document.getElementById(validatefromdateid)).style.display ="block";
    }
    else if(Number(offerpercentage) ==0)
    {
      (<HTMLInputElement>document.getElementById(offer_percent)).focus();

      (<HTMLInputElement>document.getElementById(validateoffer1)).style.display ="block";
    }


    else {
      (<HTMLInputElement>document.getElementById(offer_percent)).focus();

      (<HTMLInputElement>document.getElementById(validateoffer)).style.display ="block";
    }


  }
  getOfferPrice(term: string,termid: string): void
  {
      // alert(term);
      //alert(termid);
      var termid1=termid;
      var splitted = termid1.split("_", 3);
     // alert(splitted);
      var splitted1=splitted[1];
      var splitted2=splitted[2];
     // alert(splitted1);
      var amount="amount_"+splitted1+"_"+splitted2;
      // alert(amount);
      var serviceamount= Number((<HTMLInputElement>document.getElementById(amount)).value);
      // alert(serviceamount);
      var offeramount=(serviceamount *  Number(term))/100;
      //alert(offeramount);
      var offeramtid;
      var originalVal = serviceamount - offeramount;
      // alert(originalVal);
      offeramtid="offeramount_"+splitted[1]+"_"+splitted[2];
//alert(offeramtid);
      if(Number(term)  >0 && Number(term) <= 99){
        (<HTMLInputElement>document.getElementById(offeramtid)).value =originalVal.toString();
      }
      else{
        (<HTMLInputElement>document.getElementById(offeramtid)).value = "";
      }
     // console.log(offeramtid);
  }
  // validatedate(datestring :string)
  // {
  //   console.log($event)

  // }


  removevalidateMsg(id:any) {
    // alert("hi")
    let validateamount = "validateamount_"+id;
    let invalidamount = "validateamount1_"+id;

    // alert(validateamount)
    (<HTMLInputElement>document.getElementById(validateamount)).style.display ="none";
    (<HTMLInputElement>document.getElementById(invalidamount)).style.display ="none";
  }


  removedatevalidate(id:any, i:any) {
    // alert("hi")
    let validatemsg = "validatefromdate_"+id+"_"+i;
    let validatemsgformat = "validatefromdateformat_"+id+"_"+i;
   //alert(validatemsg);
   (<HTMLInputElement>document.getElementById(validatemsg)).style.display ="none";
   (<HTMLInputElement>document.getElementById(validatemsgformat)).style.display ="none";
  }

  removedatevalidatesms(id:any, i:any) {
    // alert("hi")
    let validateto = "validatetodate_"+id+"_"+i;
    let validatetoformat = "validatetodateformat_"+id+"_"+i;
   //alert(validatemsg);
   (<HTMLInputElement>document.getElementById(validateto)).style.display ="none";
   (<HTMLInputElement>document.getElementById(validatetoformat)).style.display ="none";
  }

  removeoffervalidata(id:any, i:any) {
    // alert("hi")
    let validoffermsg = "validateoffer_"+id+"_"+i;
    let validoffermsgformat = "validateoffer1_"+id+"_"+i;
     let validoffermsgformat1 = "validateoffer2_"+id+"_"+i;
   //alert(validatemsg);
      (<HTMLInputElement>document.getElementById(validoffermsg)).style.display ="none";
      (<HTMLInputElement>document.getElementById(validoffermsgformat)).style.display ="none";
      (<HTMLInputElement>document.getElementById(validoffermsgformat1)).style.display ="none";
  }

  loadMasterService(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getMasterServiceAndShopService(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.MasterServiceAndShopService;

      console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })


  }


  loadAllModels(){

    return this.restApi.getAllModels().subscribe((data: {}) => {
      // alert(data)
      this.MasterModelData = data;
      this.MasterModelData1 = this.MasterModelData.data.list;

      console.log("models>>>>",this.MasterModelData1)
      // this.dtTrigger.next();
    })


  }



  AddMasterserviceDetails(MasterserviceForm:any) {

    for(var j=0;j < (MasterserviceForm.length);j++) {
     // if(MasterserviceForm[j].shop_id == this.ShopHolidaysDetails1[i].shop_id){
        var newNum = "currentid";
        let currentUserId = localStorage.getItem('currentUserId');
        this.MasterserviceForm[j][newNum] = currentUserId;
      }
      console.log("ssss>>>>>",MasterserviceForm.service_name);
    this.http.post(config_url+'/shop/AddMasterservice',{MasterserviceForm})
      .subscribe(res => {

      }, (err) => {
        console.log(err.status)
        if(err.status == 200) {
          this.loadMasterService();
          this.loadServiceData();
          this.toastr.success('Services added Successfully');
         // this.MasterserviceForm.controls.service_name.setValue("");
         window.setTimeout(function(){location.reload()},5)
        }

    });
    console.log(MasterserviceForm);


  }


  AddShopserviceDetails(shopserviceForm:any) {
    // let formData = new FormData();
    // formData.append('test','2');
    // (<HTMLInputElement>document.getElementById("addserviceshopbtn")).disabled=true;
    // (<HTMLInputElement>document.getElementById("addserviceshopbtn")).style.opacity="1";
    console.log(shopserviceForm);
    // let hidden_service = (<HTMLInputElement>document.getElementById("hidden_service")).value;
    this.http.post(config_url+'/shop/AddShopserviceDetails',{shopserviceForm})
      .subscribe(res => {

      }, (err) => {
        console.log(err.status)
        if(err.status == 200) {
          this.loadServiceData();
          this.loadMasterService();
          this.loadAllModels();

          window.setTimeout(function(){location.reload()},5)
        }

    });
    console.log(shopserviceForm);
    this.toastr.success('Services added Successfully');

  }

  DisplayForm() {
    // (<HTMLInputElement>document.getElementById("shopservFormid")).style.display = "block";
  }

  changeOtherToadd(selectedVal:any) {
    // alert("hi")
console.log(selectedVal);
//this.selectedDeviceObj = selectedVal;
let currentUserId = localStorage.getItem('currentUserId');
(<HTMLInputElement>document.getElementById("model")).value='';
this.myservice = (<HTMLInputElement>document.getElementById("service")).value;
console.log(this.myservice);



// ... do other stuff here ...

this.http.get(config_url+'/shop/servicebasedonmodel?service_id='+this.myservice+
'&currentUserId='+currentUserId).subscribe(
data => {
// //alert(data)
 console.log(data);
this.servicemodelsdata = data
this.servicemodelsdataobj = this.servicemodelsdata.data.type;
console.log(this.servicemodelsdataobj);
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








  selectEvent(item:any) {
    this.toastr.error("Enter New Service Name");
    this.MasterserviceForm.controls.service_name.setValue("");
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any){
    // do something when input is focused
  }


  changeServiceStatus(serviceid:any,status:any) {
 //alert(serviceid)
// alert(status)
// alert(index);
// var updatebutton="updatebtn_"+serviceidnew+"_"+index;
// alert(updatebutton);
// if(status==1)
// {
//  // alert("hi");
//   alert(  (<HTMLInputElement>document.getElementById(updatebutton)));
//   (<HTMLInputElement>document.getElementById(updatebutton)).style.color="green";
// }

    var changeServiceStatus =
                   {
                  "shopserviceid": serviceid,
                  "status": status,
                   }

this.restApi.changeServiceStatus(changeServiceStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
    this.loadServiceData();
  }
},
success => {
  console.log('Error>>>>>', success);



}
);
  }

  changepickupStatus(statuspickupvalue : any) {

    let currentUserId = localStorage.getItem('currentUserId');

       var changepickupStatus =
                      {
                       "shopid": currentUserId,
                        "pickupstatus": statuspickupvalue,
                      }

   this.restApi. changepickupStatus(changepickupStatus).subscribe((data: any) => {
     console.log('POST Request is successful >>>>>>>>', data.status);
     if(data.status == "pass")
     {
     this. readProfileDataById()
     }
   },
   success => {
     console.log('Error>>>>>', success);



   }
   );
     }

     readProfileDataById() {


      let currentShopId = localStorage.getItem('currentUserId');
      return this.restApi.readShopProfileDataById(currentShopId).subscribe((res)=>{
        this.ProfileDataByIdObject = res


        this.ShopProfileDetails = this.ProfileDataByIdObject.data.profile

        this.statuspickupvalue = this.ShopProfileDetails.is_pickup_drop_avl

        console.log(this.statuspickupvalue);

        //console.log(this.ShopProfileDetails)

      }


      )

    }
}


