import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';
// import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RestApiService } from "../shared/rest-api.service";
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
// import { filter } from 'rxjs/operators';
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
  ApexLegend
} from "ng-apexcharts";


// @Injectable({
//   providedIn: 'root'
// })

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
};


export type ChartOptions2 = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  dataLabels: ApexDataLabels | any;
  
};

@Component({
  selector: 'app-newinsertpage',
  templateUrl: './newinsertpage.component.html',
  styleUrls: ['./newinsertpage.component.scss']
})
export class NewinsertpageComponent implements OnInit {
  currentOffer:any;
  currentOffer1:any;
  ComboOfferAmountArr:any = [];
  ComboOfferFromDateTodate:any = [];
  serviceDataOffers:any;
  serviceDataOffers1:any;
  NormalOfferPercentArr:any = [];
  servicenameArr:any = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;
  datePickerCfg: any;

  constructor(public restApi: RestApiService,private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.currentComboOffers();
    this.loadServiceDataOffers();
  }

  currentComboOffers(){
    let currentUserId = localStorage.getItem('currentUserId');
    this.restApi.getcurrentComboOffersByShopid(currentUserId).subscribe((data: {}) => {
      this.currentOffer = data;
       this.currentOffer1 = this.currentOffer;
      
      
      // this.ComboOfferAmountArr = [10,100];
       for(let i=0;i<this.currentOffer1.length;i++){
         this.ComboOfferAmountArr.push(Number(this.currentOffer1[i].offer_percent));
        // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
        this.ComboOfferFromDateTodate.push(this.currentOffer1[i].offer_name);
       }
      //  console.log("array>>>",this.ComboOfferFromDateTodate);

       this.chartOptions = {
        series: [
          {
            name: "Offer %",
            data: this.ComboOfferAmountArr
          }
        ],
        chart: {
          type: "bar",
          height: 350,
          width:300,
          colors: "red",
        },
        
        plotOptions: {
          bar: {
            horizontal: false,
            // width:20
            // data:20
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.ComboOfferFromDateTodate
        }
      };

     
      
    })
    
   
  }


  loadServiceDataOffers(){
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceDataOffers = data;
      this.serviceDataOffers1 = this.serviceDataOffers.data.getcurrentOffersByShopid;
      
      console.log("serviceDataOffers1>>>",this.serviceDataOffers1)
      // this.dtTrigger.next();

      for(let i=0;i<this.serviceDataOffers1.length;i++){
        this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
       // this.ComboOfferFromDateTodate.push(this.currentOffer1[i].start_date + " - " + this.currentOffer1[i].end_date);
       this.servicenameArr.push((this.serviceDataOffers1[i].service_name));
      }
      console.log("array>>>",this.servicenameArr);

      this.chartOptions2 = {
        series: this.NormalOfferPercentArr,
        chart: {
          width: 500,
          type: "donut"
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient"
        },
        labels: this.servicenameArr,
        // legend: {
          // enabled:true
          // formatter:  this.servicenameArr
          // formatter: function(val:any, opts:any) {
          //   return val + " - " + opts.w.globals.series[opts.seriesIndex];
          // }
        // },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })

    
  }

  onDateChange(event:any) {
  
    this.datePickerCfg.formControlDate.setValue(undefined);     // <<<---
}
}
