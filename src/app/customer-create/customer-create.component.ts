import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { config_url } from '../shared/customer/constant';
import { DynamicGrid } from '../shared//grid.model';

//import { RestApiService } from "../shared/rest-api.service";
//import { Component, OnInit } from '@angular/core';
//import {Router} from '@angular/router';
//import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

var event:string;
var num2: any;
// size:any;
var num1 = localStorage.getItem('isLoggedIn');
        if(num1 == "" || num1 == null) {
            num2 = 0;
        }
        else {
            num2 = num1;
        }

        

@Component({
selector: 'app-customer-create',
templateUrl: './customer-create.component.html',
styleUrls: ['./customer-create.component.scss'],
providers: [DatePipe]
})

export class CustomerCreateComponent implements OnInit {

  apiurlforhtm = config_url;

  @ViewChild('coverFilesInput') imgType:ElementRef;

types:any;
profileform : any;
cardetailForm :any;

dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};

  opened = true;
  opened1 = false;
  opened2 =  false;

  imageSrc: string;
  CustomerDataById: any;
  CustomerDataById1:any;
  CustomerDataById2:any;
  CustomerDataById3:any;
  firstname: any;
  myusername: any;

  date: any;
  fetchdata: any;
  fetchdata1: any;
  branddata: any;
  brandtype: any;
  selectedDeviceObj: any;
  selectedcaetype: any;
  carmodelsdata: any;
  element: HTMLElement;
  modelsdata: any;
  selecttypedata: any;
  myuser: any;

  cartypedata: any;
  cardata: any;
  citytype: any;
  citydata: any;
  statetype: any;
  statedata: any;
  carDetailsById:any;
  carDetailsById1:any;
  removedata:any;
  // offerdetails:any;
  // offerslist: any;
  // MasterServiceid1 :any;
  // MasterServiceid: any;
  Whislistid: any;
  Whislistid1: any;
  size: any;
  width: number;
  height: number;
  current_date: any;



  constructor(
    public router: Router,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    public restApi: RestApiService,
    private toastr: ToastrService,public datepipe: DatePipe
   ) {


 }

 file=new FormControl('')
  file_data:any=''

ngOnInit() {

  (<HTMLInputElement>document.getElementById("autofocus1")).focus();

  this.readCustomerDataById();
  this.loadcartype();
  this.loadcarbrand();
  this. loadcitylist();
  this.getstatedata();
  this.loadcarDetailsById();
  this.Whislistdata();


  element: HTMLElement;

  let currentUserId:any = localStorage.getItem('currentUserId');

  this.date=new Date();
this.current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

  const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  const zipcodePattern = "^[1-9][0-9]{5}$";
  const vehiclenumberpattern = "^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}{0,1}[0-9]{1,4}$";
 
  this.profileform = this.frmbuilder.group({
    firstname: ['', Validators.required],
     lastname: ['', Validators.required],
    dob: [],
    doorno: ['', Validators.required],
    state: ['', Validators.required],
     gender: [],
      city: ['', Validators.required],
     street: ['', Validators.required],
    //  fueltype: ['', Validators.required],
    //  cartype: ['', Validators.required],
    //  brand: ['', Validators.required],
    //  color: ['', Validators.required],
    //  model: ['', Validators.required],
     zipcode: ['', [Validators.required, Validators.pattern(zipcodePattern)]],
     emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
    mobileno:['', [Validators.required, Validators.pattern(mobilePattern)]],
     lastupddt: [this.current_date, [Validators.required]],
    customer_id:[currentUserId, [Validators.required]]

    })


    this.cardetailForm = this.frmbuilder.group({

       fueltype: ['', Validators.required],
       cartype: ['', Validators.required],
       brand: ['', Validators.required],
       color: ['', Validators.required],
       model: ['', Validators.required],
       lastupddt: [this.current_date, [Validators.required]],
       customer_id:[currentUserId, [Validators.required]],
       vehicle_number: ['', Validators.required],
       carinfo_status: [1, Validators.required]
      })



;}


addRow() {
  this.newDynamic = {title1: "", title2: "",title3:""};
  this.carDetailsById1.push(this.newDynamic);
  this.toastr.success('New row added successfully', 'New Row');
  // console.log(this.dynamicArray);
  return true;
}

deleteRow(index:any) {
  if(this.dynamicArray.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.carDetailsById1.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
  }
}


readCustomerDataById() {

  let currentUserId = localStorage.getItem('currentUserId');

  return this.restApi.readCustomerDataById(currentUserId).subscribe((res)=>{
    this.CustomerDataById = res


    this.CustomerDataById1 = this.CustomerDataById.data.profile
    console.log("shop info>>>",this.CustomerDataById);

  }


  )

}


showSuccess() {

  this.toastr.success('Customer Feedback Added Successfully!');
}

showError() {

  this.toastr.error('Something went wrong!');
}



get f(){
  return this.profileform.controls;
}


fileChange(event:any) {

 
   

  const fileList: FileList = event.target.files;
  //check whether file is selected or not
  if (fileList.length > 0) {

    


      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo',file.name,file.size,file.type);
      console.log('size',file.size);
      console.log('type',file.type);
      console.log('type',file);
      //max file size is 4 mb
      let currentUserId:any = localStorage.getItem('currentUserId');
      if(file.type == "image/jpeg") {
        if(file.size < 70000)
      {
        let formData = new FormData();
        let info={id:2,name:'raja'}
        formData.append('file', file, file.name);
        formData.append('id','2');
        formData.append('tz',new Date().toISOString())
        formData.append('update','2')
        formData.append('info',JSON.stringify(info))
        formData.append('currentUserId',currentUserId)

        this.file_data=formData

      }else{
        this.toastr.error("File size should not exceeds 70 KB");
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
        
      }
      else if(file.type == "image/png") {
        if(file.size < 70000)
      {
        let formData = new FormData();
        let info={id:2,name:'raja'}
        formData.append('file', file, file.name);
        formData.append('id','2');
        formData.append('tz',new Date().toISOString())
        formData.append('update','2')
        formData.append('info',JSON.stringify(info))
        formData.append('currentUserId',currentUserId)

        this.file_data=formData

      }else{
        this.toastr.error("File size should not exceeds 50 KB");
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
      }
      else {
        this.toastr.error("File must be jpeg/png");
      }
      

  
}


  // alert(this.file_data)

  this.http.post(config_url+'/app/AddCustomerInsert',this.file_data)
      .subscribe(res => {
      //send success response
      }, (err) => {
      //send error response
    });

    // this.toastr.success('Profile Image Successfully');
    
    
   }   






uploadFile(profileform:any)
    {

      this.http.post(config_url+'/app/AddCustomerdetails',profileform)
      .subscribe(res => {

      }, (err) => {

    });
    console.log(profileform);
    this.toastr.success('Profile Updated Successfully');
    // window.location.reload();
    }

    loadcartype(){


      return this.restApi.getcartype().subscribe((cartypedata: {}) => {
        // alert(data)
        this.fetchdata = cartypedata;
        this.fetchdata1 = this.fetchdata.data.type;

        // console.log("data>>>>",this.fetchdata1)
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

    loadcitylist(){


      return this.restApi.getcitylist().subscribe((citylistdata: {}) => {

       // console.log(citylistdata)
        this.citytype = citylistdata;

        console.log(this.citytype)
    //console.log("hi")
        this.citydata = this.citytype.data.list;

        //  console.log("data>>>>",this.citydata)
      })
    }

    getstatedata(){


      return this.restApi.getstatelist().subscribe((statelistdata: {}) => {

        this.statetype = statelistdata;
       this.statedata = this.statetype.data.list;

    //  console.log("data>>>>",this.statedata)
      })
    }

    onChangeObj(newObj: any) {
      console.log(newObj);


      this.selectedDeviceObj = newObj;
      
      this.cardetailForm.controls.model.setValue("");
      //(<HTMLInputElement>document.getElementById("model")).value='';
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
    this.cardetailForm.controls.model.setValue("");
    //(<HTMLInputElement>document.getElementById("model")).value='';
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


AddCustomerCarDetails(cardetailForm:any)
    {
      // alert("cardetailForm"+cardetailForm)
      this.http.post(config_url+'/app/CustomerCarDetailsInsert',cardetailForm)
      .subscribe(res => {
      console.log("res>>>>>",res);
      }, (err) => {
        console.log("err>>>>>",err);
        if(err.status == 200) {
          this.toastr.success('Car Details added Successfully');
          // location.reload(true);
          // window.setTimeout(function(){location.reload()},100);
    //       let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl]);
  // }); 
  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
  
          this.loadcarDetailsById();
          this.cardetailForm.reset();
          let currentUserId:any = localStorage.getItem('currentUserId');
          this.date=new Date();
          let current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
          this.cardetailForm.controls.lastupddt.setValue(current_date);
          this.cardetailForm.controls.customer_id.setValue(currentUserId);
          this.cardetailForm.controls.carinfo_status.setValue(1);
          // this.cardetailForm.controls.fueltype.setValue("");
          // this.cardetailForm.controls.cartype.setValue("");
          // this.cardetailForm.controls.brand.setValue("");
          // this.cardetailForm.controls.color.setValue("");
          // this.cardetailForm.controls.model.setValue("");
          // this.cardetailForm.controls.vehicle_number.setValue("");
        }
    });
    // console.log(profileform);

    // window.location.reload();
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


    RemoveMyCarInfo(carinfo_id:any) {
      // alert(carinfo_id)
      this.restApi.RemoveMyCarInfo(carinfo_id).subscribe((data: {}) => {

       this.removedata = data;
       console.log("Remove>>>",data)
       if(this.removedata.status == "pass"){
        this.toastr.error('Vehicle deleted');
        this.loadcarDetailsById();
        // window.location.reload(true);
       this.timedRefresh();
        // window.setTimeout(function(){location.reload()},2000);
       }
      })

    }
     timedRefresh() {
      window.setTimeout(function(){location.reload()},100);
      // setTimeout("location.reload(true);", 300);
    }

    reloadCurrentRoute() {
      
      // let currentUrl = this.router.url;
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      //   window.setTimeout(function(){location.reload()},2000);
      //     this.router.navigate([currentUrl]);
      // });
  }


    // loadshopoffers(currentShopId:any){

    //   // let currentShopId = 1;

    //   return this.restApi.ShopoffersById(currentShopId).subscribe((data: {}) => {

    //     //console.log('testabi', data);

    //     this.offerdetails = data;
    //     this.offerslist = this.offerdetails.data.OnlineBookingShopDetails;
    //     console.log("test>>>>",this.offerslist)

    //   })

    // }



      // idbyMasterService(){

      //   return this.restApi.getMasterService().subscribe((data: {}) => {
      //     // alert(data)
      //     this.MasterServiceid = data;
      //     this.MasterServiceid1 = this.MasterServiceid.data.type;

      //     console.log("aravind>>>>",this.MasterServiceid1)
      //     // this.dtTrigger.next();

      //   })
      // }

      Whislistdata()
      {
        let currentUserId = localStorage.getItem('currentUserId');

        return this.restApi.getcustomerwhislistprofile(currentUserId).subscribe((data: {}) => {
          // alert(data)
          this.Whislistid = data;
          // let test = this.Whislistid
          // console.log(test);

          this.Whislistid1= this.Whislistid.data.getcustomerwhislist;

           console.log("whislist",this.Whislistid1);
          // this.dtTrigger.next();
        })

      }

      slideConfig3= {"slidesToShow": 2, "slidesToS5croll": 1};

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

   
      disableDate(){
        return false;
    }

  }





function newObj(newObj: any) {
  throw new Error('Function not implemented.');
}


