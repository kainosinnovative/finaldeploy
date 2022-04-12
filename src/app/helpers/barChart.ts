import { Options } from 'highcharts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

export class bchart1   {
  currentOffer:any;
  currentOffer1:any;
  ComboOfferAmountArr:any;
  ComboOfferFromDateTodate:any;
  constructor(public restApi: RestApiService,private http: HttpClient,private frmbuilder: FormBuilder,
    private toastr: ToastrService, private  dialog:  MatDialog) { 
      this.currentComboOffers2();
    }

    

    currentComboOffers2(){
      // alert("in");
      console.log("barchart>>>");
//       let currentUserId = localStorage.getItem('currentUserId');
//       this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
//         this.currentOffer = data;
//          this.currentOffer1 = this.currentOffer;
    
    
//         // this.ComboOfferAmountArr = [10,100];
//          for(let i=0;i<this.currentOffer1.length;i++){
//            this.ComboOfferAmountArr.push(Number(this.currentOffer1[i].offer_percent));
//           // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
//           this.ComboOfferFromDateTodate.push(this.currentOffer1[i].offer_name);
//          }
//       alert(this.ComboOfferFromDateTodate)
         
// })
    }
  }
  

// currentComboOffers(){
//   let currentUserId = localStorage.getItem('currentUserId');
//   this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
//     this.currentOffer = data;
//      this.currentOffer1 = this.currentOffer;


//     // this.ComboOfferAmountArr = [10,100];
//      for(let i=0;i<this.currentOffer1.length;i++){
//        this.ComboOfferAmountArr.push(Number(this.currentOffer1[i].offer_percent));
//       // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
//       this.ComboOfferFromDateTodate.push(this.currentOffer1[i].offer_name);
//      }
//   );
//     }

export const barChart: Options = {
  chart: {
    type: 'bar',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: 'Bar',
  },
  yAxis: {
    //visible: false,
    gridLineColor: '#fff',
    title: {
      text: 'value',
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: 'Bar',
    },
    lineColor: '#fff',
    // categories: this.ComboOfferFromDateTodate,
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },

  plotOptions: {
    
    series: {
      borderRadius: 5,
    } as any,
  },

  series: [
    {
      
      type: 'bar',
      color: '#506ef9',
      data: [
        { y: 20.9},
        { y: 71.5 },
        { y: 106.4 },
        { y: 129.2 },
        { y: 144.0 },
        { y: 176.0 },
        { y: 135.6 },
        { y: 148.5 },
        { y: 216.4 },
        { y: 194.1 },
        { y: 95.6 },
        { y: 54.4 },
      ],
    },
  ],
};
