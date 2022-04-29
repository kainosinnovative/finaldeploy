import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewbookdetailPopupComponent } from '../viewbookdetail-popup/viewbookdetail-popup.component';
import { MatDialog } from '@angular/material/dialog';
// import { barChart2 } from '../testinsert/testinsert.component';
import { Chart } from 'angular-highcharts';
// import { Options } from 'highcharts';
import { config_url } from '../shared/customer/constant';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend,ApexYAxis
} from "ng-apexcharts";
import * as CanvasJS from './canvasjs.min';
import { AfterViewInit, VERSION } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { reduce } from 'highcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  yaxis:ApexYAxis | any;
  tooltip:ApexChart | any;
};


export type ChartOptions3 = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  yaxis:ApexYAxis | any;
  tooltip:ApexChart | any;

};
@Component({
  selector: 'app-shopdashboard',
  templateUrl: './shopdashboard.component.html',
  styleUrls: ['./shopdashboard.component.scss']
})
export class ShopdashboardComponent implements OnInit {
  donutChart: any;
  columnChart: any;
  opened = true;
  opened1 = false;
  opened2 = false;
   apiURL = config_url;
  // barChart = new Chart(barChart);

  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  posts: any;
  dtOptions1: any = {};
  posts1: any;
  ComboOffersByShopiddashboard:any;
  ComboOffersByShopiddashboard1:any;
  bookingDetails:any;
  bookingDetails1:any;
  config: any;
  config1: any;
  MasterServiceData:any;
  MasterServiceData1:any;
  pickdrop_statusDetails:any;
  pickdrop_statusDetails1:any;
  carwashstatus:any;
  carwashstatus1:any;
  AcceptbookingDetails:any;
  AcceptbookingDetails1:any;
  currentOffer:any;
  currentOffer1:any;
  config2:any;
  config3:any;
  serviceDataOffers: any;
  serviceDataOffers1: any;
  ComboOfferAmountArr:any = [];
  ComboOfferFromDateTodate:any = [];
  NormalOfferPercentArr:any = [];
  servicenameArr:any = [];

  bookingDetailsById:any;
  bookingDetailsById1:any;
  ViewBooking_heading:any;
  loadmasterComboOfferval:any;
  loadmasterComboOfferval1:any;
  combocustomer :any;
 combocustomer1:any;
 combocustomerArr:any = [];
 combocustomerArr1:any=[];
 combocustomerArr2:any=[];
 lastservice:any = [];
 lastservice2:any = [];


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions>;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) {
      let currentUserId = localStorage.getItem('currentUserId');
      this.http.get(this.apiURL + "/shop/customerBookingForShop?currentUserId="+currentUserId)
        .subscribe(posts => {
          this.posts = posts;
          console.log("ss newbooking>>",this.posts);
      }, error => console.error(error));
      this.http.get(this.apiURL + "/shop/AcceptedBookingList?currentUserId="+currentUserId)
      .subscribe(posts1 => {
        this.posts1 = posts1;
        console.log("ss>>",this.posts1);
    }, error => console.error(error));
     }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("shopdashboardfocus")).style.display="none";
    (<HTMLInputElement>document.getElementById("shopdashboardfocus")).focus();
    // alert(localStorage.getItem('is_pickup_drop_avl'))
    // this.AcceptedBookingList();
    this.customerBookingForShop();
    this.loadMasterService();
    this.master_pickdrop_status();
    this.master_carwash_status();
    this.currentComboOffers();
    this.combocustomerinfo();

    this.getBookingByid();

    this.loadmasterComboOffer();
    this.ViewBooking_heading = localStorage.getItem('ViewBooking_heading');
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.config1 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    // this.config2 = {
    //   itemsPerPage: 10,
    //   currentPage: 1,

    // };
    this.config3 = {
      itemsPerPage: 10,
      currentPage: 1,
      // totalItems: this.collection.count
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      order:[[2, 'desc']],
      
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
           className: 'custom-btn fa fa-file-pdf-o ',
           text: ''
         },
         {
           titleAttr: 'Download as Excel',
           extend: 'excelHtml5',
           className: 'custom-btn fa fa-file-excel-o',
           text: '',
          //  exportOptions: {
          //   columns: [ 0, 1, 3, 4, 5, 6],
            // 'columnDefs': [ {
              //'targets': [1,2], /* column index */
            //  'orderable': false, /* true or false */
          //  }]
      //  }
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

        ],
        // select: true,
      }

    };
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      order:[[3, 'desc']],
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
           text: '',

           exportOptions: {
            columns: [ 1,2,3,4,5,6]
       }
         },
         {
           titleAttr: 'Download as CSV',
           extend: 'csvHtml5',
           className: 'custom-btn fa fa-file-text-o',
           text: '',
           exportOptions: {
            columns: [ 1,2,3,4,5,6]
       }
         },
         {
           titleAttr: 'Print',
           extend: 'print',
           className: 'custom-btn fa fa-print',
           text: '',
           exportOptions: {
            columns: [ 1,2,3,4,5,6]
       }
         },

        ],
        select: true,
      }

    };
    this.loadServiceDataOffers();
    this.initColumn();



    this.getcurrentComboOffersByShopiddashboard();

  }

  FinalBarchartArr = new Array();
  getcurrentComboOffersByShopiddashboard(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getcurrentComboOffersByShopiddashboard(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.ComboOffersByShopiddashboard = data;
      this.ComboOffersByShopiddashboard1 = this.ComboOffersByShopiddashboard;

      console.log("ComboOffersByShopiddashboard>>>",this.ComboOffersByShopiddashboard1)

      // for(let i=0;i<this.ComboOffersByShopiddashboard1.length;i++){

      //   var json =
      //              {
      //             "y": Number(this.ComboOffersByShopiddashboard1[i].y),
      //             "label": this.ComboOffersByShopiddashboard1[i].label
      //              }
      //   this.FinalBarchartArr.push(json);

      // }


      // let chart = new CanvasJS.Chart("chartContainer", {
      //   animationEnabled: true,
      //   exportEnabled: true,
      //   title: {
      //     text: "Basic Column Chart in Angular"
      //   },
      //   axisX: {
      //     title: "Departments"
      //   },
      //   axisY: {
      //     title: "Salary in USD",
      //   },
      //   data: [{
      //     type: "column",
      //     dataPoints: [this.FinalBarchartArr
      //       // { y: 71, label: "Apple" },
      //       // { y: 55, label: "Mango" },
      //       // { y: 50, label: "Orange" },
      //       // { y: 65, label: "Banana" },
      //       // { y: 95, label: "Pineapple" },
      //       // { y: 68, label: "Pears" },
      //       // { y: 28, label: "Grapes" },
      //       // { y: 34, label: "Lychee" },
      //       // { y: 14, label: "Jackfruit" }
      //     ]
      //   }]
      // });

      // chart.render();
    })


  }

  customerBookingForShop(){

    // let currentUserId = localStorage.getItem('currentUserId');

    // return this.restApi.getcustomerBookingForShop(currentUserId).subscribe((data: {}) => {
    //   // alert(data)
    //   this.bookingDetails = data;
    //   //console.log("abi", this.shopdetails);
    //    this.bookingDetails1 = this.bookingDetails.data.customerBookingForShop;

    //   //  console.log("bookingDetails1>>>>",this.bookingDetails1)

    // })
  }

  loadMasterService(){

    return this.restApi.getMasterService().subscribe((data: {}) => {
      // alert(data)
      this.MasterServiceData = data;
      this.MasterServiceData1 = this.MasterServiceData.data.type;

      // console.log("data>>>>",this.MasterServiceData1)
      // this.dtTrigger.next();
    })


  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  pageChanged1(event:any){
    this.config1.currentPage = event;
  }

  // pageChanged2(event:any){
  //   this.config2.currentPage = event;
  // }

  pageChanged3(event:any){
    this.config3.currentPage = event;
  }

  master_pickdrop_status(){
    return this.restApi.getmaster_pickdrop_status().subscribe((data: {}) => {
      // alert(data)
      this.pickdrop_statusDetails = data;
       this.pickdrop_statusDetails1 = this.pickdrop_statusDetails.master_pickdrop_status;

      //  console.log("Details1>>>>",this.pickdrop_statusDetails1)

    })
  }

  master_carwash_status(){
    return this.restApi.getmaster_carwash_status().subscribe((data: {}) => {
      // alert(data)
      this.carwashstatus = data;
       this.carwashstatus1 = this.carwashstatus.master_carwash_status;

       console.log("master_carwash_status>>>>",this.carwashstatus1)

    })
  }

  acceptrejectbooking(booking_status:any, Booking_id:any, pickup_drop:any) {
    // let pickedAndDropId = "PickupDrop_"+Booking_id;
    // let pickedAndDrop_status = (<HTMLInputElement>document.getElementById(pickedAndDropId)).value;

    // if(pickedAndDrop_status == ""){
    //   this.toastr.error("please select pickup status");
    //   (<HTMLInputElement>document.getElementById(pickedAndDropId)).focus();
    // }
    // else {
    var changeBookingStatus =
                   {
                  "booking_status": booking_status,
                  "Booking_id": Booking_id,
                  "pickup_drop":pickup_drop
                   }

this.restApi.changeBookingStatus(changeBookingStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {


    // let currentUserId = localStorage.getItem('currentUserId');
    //   this.http.get(this.apiURL + "/shop/customerBookingForShop?currentUserId="+currentUserId)
    //     .subscribe(posts => {
    //       this.posts = posts;
    //       console.log("ss1>>",this.posts);
    //   }, error => console.error(error));
    //   this.http.get(this.apiURL + "/shop/AcceptedBookingList?currentUserId="+currentUserId)
    //   .subscribe(posts1 => {
    //     this.posts1 = posts1;
    //     console.log("ss2>>",this.posts1);
    // }, error => console.error(error));


    // this.customerBookingForShop();
    // this.AcceptedBookingList();
    if(booking_status == "Accepted"){
      this.toastr.success(booking_status);
    }
    else {
      this.toastr.error(booking_status);
    }
    window.setTimeout(function(){location.reload()},100);
  }
},
success => {
  console.log('Error>>>>>', success);



}
);
  }

// }

AcceptedBookingList(){

  let currentUserId = localStorage.getItem('currentUserId');

  return this.restApi.getAcceptedBookingList(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.AcceptbookingDetails = data;
    //console.log("abi", this.shopdetails);
     this.AcceptbookingDetails1 = this.AcceptbookingDetails.data;

     console.log("AcceptbookingDetails>>>>",this.AcceptbookingDetails1)

  })
}

updateCarwashStatus(Booking_id:any) {
let carwashStatusId = "carwash_"+Booking_id;
    let carwash_status = (<HTMLInputElement>document.getElementById(carwashStatusId)).value;

    if(carwash_status == ""){
      this.toastr.error("Please select carwash status");
      (<HTMLInputElement>document.getElementById(carwashStatusId)).focus();
    }
    else {
      var changeCarwashStatus =
                   {
                  "carwash_status": carwash_status,
                  "Booking_id": Booking_id

                   }

this.restApi.changeCarwashStatus(changeCarwashStatus).subscribe((data: any) => {
  console.log('POST Request is successful >>>>>>>>', data.status);
  if(data.status == "pass") {
    this.toastr.success('Carwash status updated');
    // this.toastr.success("Carwash status updated");

    // this.carwashfnRefresh();
    window.setTimeout(function(){location.reload()},100);


  }
},
success => {
  console.log('Error>>>>>', success);



}
);
    }
}
combocustomerinfo()
{
  let currentUserId = localStorage.getItem('currentUserId');
  this.restApi.getcombocustomerinfo(currentUserId).subscribe((data: {}) => {
    this.combocustomer = data;
    console.log("seetha>>",this.combocustomer);
     this.combocustomer1 = this.combocustomer;
      //this.combocustomer1 = "";  // empty data

     console.log("arrayold>>>",this.combocustomer1);

    // this.ComboOfferAmountArr = [10,100];
     for(let i=0;i<this.combocustomer1.length;i++){
       this.combocustomerArr.push(this.combocustomer1[i].count);
      // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
      this.combocustomerArr1.push(this.combocustomer1[i].offername+"("+this.combocustomer1[i].modelname+")");
      this.combocustomerArr2.push(this.combocustomer1[i].modelname);
     }
     console.log("arraynew>>>",this.combocustomerArr1);

     this.chartOptions3 = {



      series: [
        {
          name: "No. of Customers",
          data: this.combocustomerArr
        }
      ],
      chart: {
        toolbar: {
          show: false,

          tools: {
            // download: false,
            download: '<i style="font-size:12px;color:black" class="fa fa-download" title="Download"></i>',

          },
        },

        

        type: "bar",
        height: 300,
        width:400,
        colors:  ['#546E7A', '#E91E63'],
        
        

      },

      plotOptions: {
        bar: {
          horizontal: false,
          // width:20,
          columnWidth: '15%',
          color:"red"
          // data:20
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        // categories: ["test"],
        categories: this.combocustomerArr1,
                title: {
          text: "Offer Name",
          style: {
            color: "#000000",
            //font:"20px"
          }
        },


      },
      yaxis: {

        scaleLabel: {
          display: true,
          labelString: "Date",
         },



    },
    tooltip: {
      y: {
        formatter: function(val:any) {
          return ''
        },
        title: {
          formatter: function (seriesName:any) {
            return ''
          }
        }
      }
    }
  };



  })


}
carwashfnRefresh() {
  let currentUserId = localStorage.getItem('currentUserId');
    this.http.get(this.apiURL + "/shop/AcceptedBookingList?currentUserId="+currentUserId)
    .subscribe(posts1 => {
      this.posts1 = posts1;
      console.log("ss2>>",this.posts1);
  }, error => console.error(error));
}
currentComboOffers(){
  let currentUserId = localStorage.getItem('currentUserId');
  this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
    this.currentOffer = data;
     this.currentOffer1 = this.currentOffer;
      //  this.currentOffer1 = '';  // empty data
     console.log("array1111>>>",this.currentOffer1);
    // this.ComboOfferAmountArr = [10,100];
     for(let i=0;i<this.currentOffer1.length;i++){
       this.ComboOfferAmountArr.push(Number(this.currentOffer1[i].offer_percent));
      // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
      this.ComboOfferFromDateTodate.push(this.currentOffer1[i].offer_name  +"(" +this.currentOffer1[i].model_name+")");
     }
     console.log("combo apr8>>>",this.ComboOfferFromDateTodate);

     this.chartOptions = {



      series: [
        {
          name: "Offer %",
          data: this.ComboOfferAmountArr
        }
      ],
      chart: {
        toolbar: {
          show: false,

          tools: {
            // download: false,
            download: '<i style="font-size:12px;color:black" class="fa fa-download" title="Download"></i>',

          },
        },
        fill: {
          colors: ['red']
        },
        type: "bar",

        height: 300,
        width:400,
        colors: "red",

      },

      plotOptions: {
        bar: {
          horizontal: true,
          width:20,
          columnWidth: '15%',
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        // categories: ["test"],
        categories: this.ComboOfferFromDateTodate,
        title: {
          text: "Offer %",
          style: {
            color: "#000000",
            //font:"20px"
          }
        },


      },
      
      yaxis: {

        scaleLabel: {
          display: true,
          labelString: "Date",
         },



    },
    tooltip: {
      y: {
        formatter: function(val:any) {
          return ''
        },
        title: {
          formatter: function (seriesName:any) {
            return ''
          }
        }
      }
    }
  };



  })


}


loadServiceDataOffers(){

  let currentUserId = localStorage.getItem('currentUserId');
  return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
    // alert(data)
    this.serviceDataOffers = data;
    this.serviceDataOffers1 = this.serviceDataOffers;
    // this.myJSON = JSON.stringify(this.serviceDataOffers1);
  //  console.log(this.myJSON)
  

    // for(let i=0;i<this.serviceDataOffers1.length;i++){
    //   this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
    //  this.servicenameArr.push((this.serviceDataOffers1[i].service_name + "<br>"+ "(" + this.serviceDataOffers1[i].model_name) + ")");
    // }

//this.serviceDataOffers1=""; // empty data
    this.initDonut(this.serviceDataOffers1);
    

  })


}


initColumn() {
  // const column = new Chart({
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Unique User'
  //   },
  //   credits: {
  //     enabled: false
  //   },

    
  // });
  // column.addPoint(12);
  // this.columnChart = column;
  // column.ref$.subscribe(console.log);
}
initDonut(serviceDataOffers1:any) {
  
  this.lastservice = new Array();
  var json1;
  console.log("serviceDataOffers1>>>",serviceDataOffers1)
  for(let i=0;i<serviceDataOffers1.length;i++){
     json1 =
    {
      // + "<br>"+ "(" + serviceDataOffers1[i].model_name
   name:  ((this.serviceDataOffers1[i].service_name + "<br>"+ "(" + this.serviceDataOffers1[i].model_name) + ")"),
  //  serviceDataOffers1[i].name,
   y: Number(serviceDataOffers1[i].offer_percent)
    }
    // alert(json1)
     
     this.lastservice.push(json1);
     console.log("json1>>>",json1)
      }
 


// var staticjson =  [{
//     name: 'Chrome',
//     y: 10
//   },
//   {
//     name: 'Internet Explorer',
//     y: 11.84,
//   }, {
//     name: 'Firefox',
//     y: 10.85,
//   }, {
//     name: 'Edge',
//     y: 4.67
//   }, {
//     name: 'Safari',
//     y: 4.18
//   }];

  // console.log("json3>>>",json3)
    
  var finaljson = (this.lastservice);
    
    // let finaljson2 = finaljson1.slice(1, -1);
    console.log("this.lastservice2>>>",this.lastservice2)
  const donut = new Chart({
    chart: {
      // plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
  
    title: {
      text: '',
      // text: '<strong>Service<br>Offers</strong>',
      
      align: 'center',
      verticalAlign: 'middle',
      y: 0
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        // allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,

         distance: -50,
          style: {
           mode: 'percentage',
           render: 'value',
           fontWeight: 'bold',
            color: 'white'
          }
        },
        
       
        // startAngle: -90,
        // endAngle: -180,
        center: ['50%', '50%'],
        size: '100%',
        showInLegend: true
      }
    },
    
    
    series: [
      {
        name: 'Service',
        data:  finaljson,

        type: 'pie',
        innerSize: '50%',
      }],
      
  });
  this.donutChart = donut;

}



viewBookingDetails(id :any)
{
  alert(id)
}




ViewDetailsPopup(Booking_id:any, heading:any){
  localStorage.setItem('ViewBooking_id',Booking_id);
  localStorage.setItem('ViewBooking_heading',heading);
//   // alert("hi")
  // this.dialog.open(ViewbookdetailPopupComponent,{disableClose: true,
  // width: '50%'});
  this.dialog.open(ViewbookdetailPopupComponent,{disableClose: true});

}

getBookingByid() {
  // alert(Booking_id)
  let Booking_id = localStorage.getItem('ViewBooking_id');
  return this.restApi.getBookingDetailsById(Booking_id).subscribe((data: {}) => {
    // alert(data)
    this.bookingDetailsById = data;
    //console.log("abi", this.shopdetails);
    //  this.bookingDetailsById1 = this.bookingDetailsById.data;

     console.log("bookingDetails2>>>>",this.bookingDetailsById)

  })
    }

    loadmasterComboOffer() {

      return this.restApi.loadmasterComboOffer().subscribe((data: {}) => {
        // alert(data)
        this.loadmasterComboOfferval = data;

         this.loadmasterComboOfferval1 = this.loadmasterComboOfferval;

         console.log("loadmasterComboOfferval1>>>>",this.loadmasterComboOfferval1)

      })
        }

        closeMe() {
          localStorage.removeItem("ViewBooking_id");
          localStorage.removeItem("ViewBooking_heading");

       }

}
