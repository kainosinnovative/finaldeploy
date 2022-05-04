import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewbookdetailPopupComponent } from '../viewbookdetail-popup/viewbookdetail-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, VERSION,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { HttpParams,HttpHeaders } from '@angular/common/http';
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {
  MybookingDetails:any;
  title = 'dataTableDemo';
  apiURL = config_url;
//dtOptions: DataTables.Settings = {};
dtOptions: any = {};
posts: any;
 
  MybookingDetails1:any=[];
  config:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  carwashstatus:any;
  carwashstatus1:any;
  MasterModelData:any;
  MasterModelData1:any;
  // @ViewChild(DataTableDirective)
  // datatableElement: DataTableDirective;
  //dtOptions: DataTables.Settings = {};
  persons: any = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we make sure the data gets fetched before rendering
  // dtTrigger: Subject<any> = new Subject();

  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) {
      let currentUserId = localStorage.getItem('currentUserId');
      this.http.get(this.apiURL + "/app/getMybookingDetails?currentUserId="+currentUserId)
        .subscribe(posts => {
          this.posts = posts;
          console.log("ss>>",this.posts);
      }, error => console.error(error));
    }

  ngOnInit(): void {

   // this.loadMybookingDetails();
    this.loadMasterService();
    this.master_carwash_status();
   // this.ngAfterViewInit();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      order:[],
      
      buttons: {
        dom: {
          button: {
            tag: 'i',
            className: ''
          }
        },
        //since we now have completely unstyled icons add
        //some space between them trough a .custom-btn class
        buttons: [
         {
           titleAttr: 'Download as PDF',
           extend: 'pdfHtml5',
           className: 'custom-btn fa fa-file-pdf-o',
           text: ''
         },
         {
           titleAttr: 'Download as Excel',
           extend: 'excelHtml5',
           className: 'custom-btn fa fa-file-excel-o',
           text: ''
         },
         {
           titleAttr: 'Download as CSV',
           extend: 'csvHtml5',
           className: 'custom-btn fa fa-file-text-o',
           text: ''
         },
         {
           titleAttr: 'Print',
           extend: 'print',
           className: 'custom-btn fa fa-print',
           text: ''
         },

        ]
      
      }

    };
  //   let currentUserId = localStorage.getItem('currentUserId');
  //   this.http.get<any[]>(this.apiURL + "/app/getMybookingDetails?currentUserId="+currentUserId) .subscribe(
  //     data => {
  //      alert(data);
  //       this.persons = data
  //      // console.log("11",this.persons);
  //       this.MybookingDetails1=this.persons;
  //       console.log("ss>>",this.MybookingDetails1);
  //     }



  // );
 //this.ngAfterViewInit();
this.loadAllModels();
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

  // ngAfterViewInit(): void {

  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.columns().every(function () {
  //       const that = this;
  //       $('input', this.footer()).on('keyup change', function () {
  //         if (that.search() !== this['value']) {
  //           that
  //             .search(this['value'])
  //             .draw();
  //         }
  //       });
  //     });
  //   });

 // }
  // loadMybookingDetails(){




  // }


  // rerender(): void {
  //     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //       this.dtTrigger.next();
  //     });
  // }
  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.columns().every(function () {
  //       const that = this;
  //       $('input', this.footer()).on('keyup change', function () {
  //         if (that.search() !== this['value']) {
  //           that.search(this['value']).draw();
  //         }
  //       });
  //     });
  //   });
  // }
  pageChanged(event:any){
    this.config.currentPage = event;
  }

  loadMasterService(){

    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;

      // console.log("data>>>>",this.MasterServiceData1)

    })


  }

  ViewDetailsPopup(Booking_id:any, heading:any){
    localStorage.setItem('ViewBooking_id',Booking_id);
    localStorage.setItem('ViewBooking_heading',heading);
  //   // alert("hi")
    this.dialog.open(ViewbookdetailPopupComponent,{disableClose: true,
    width: '50%'});

  }

  closeMe() {
    localStorage.removeItem("ViewBooking_id");
    localStorage.removeItem("ViewBooking_heading");

 }

 master_carwash_status(){
  return this.restApi.getmaster_carwash_status().subscribe((data: {}) => {
    // alert(data)
    this.carwashstatus = data;
     this.carwashstatus1 = this.carwashstatus.master_carwash_status;

     console.log("master_carwash_status>>>>",this.carwashstatus1)

  })
}

}



