import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-doughnutstackblitz',
  templateUrl: './doughnutstackblitz.component.html',
  styleUrls: ['./doughnutstackblitz.component.scss']
})
export class DoughnutstackblitzComponent implements OnInit {
  donutChart: any;
  columnChart: any;
  serviceDataOffers:any;
  serviceDataOffers1:any;
  NormalOfferPercentArr:any = [];
  servicenameArr:any = [];
  myJSON:any;
  lastservice:any = [];
  lastservice2:any = [];
  // sitePersonel = {};
  // employees = [];
  // sitePersonel.employees = employees;
// console.log(sitePersonel);
  constructor(public restApi: RestApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadServiceDataOffers();
    this.initColumn();
    // this.initDonut();
  }
  
  loadServiceDataOffers(){

    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.getServiceDataOffers(currentUserId).subscribe((data: {}) => {
      // alert(data)
      this.serviceDataOffers = data;
      this.serviceDataOffers1 = this.serviceDataOffers;
      this.myJSON = JSON.stringify(this.serviceDataOffers1);
     console.log(this.myJSON)
    
  
      for(let i=0;i<this.serviceDataOffers1.length;i++){
        this.NormalOfferPercentArr.push(Number(this.serviceDataOffers1[i].offer_percent));
       this.servicenameArr.push((this.serviceDataOffers1[i].service_name + "<br>"+ "(" + this.serviceDataOffers1[i].model_name) + ")");
      }


      this.initDonut(this.serviceDataOffers1);
      
  
    })


  }

  initColumn() {
    const column = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Unique User'
      },
      credits: {
        enabled: false
      },

      // series: [{
      //   name: 'Line 1',
      //   data: [1, 52, 123, 90, 24, 67, 77],
      //   // type: undefined
      // }]
    });
    column.addPoint(12);
    this.columnChart = column;
    column.ref$.subscribe(console.log);
  }
  initDonut(serviceDataOffers1:any) {
    
    this.lastservice = new Array();
    var json1;
    console.log("serviceDataOffers1>>>",serviceDataOffers1)
    for(let i=0;i<serviceDataOffers1.length;i++){
       json1 =
      {
        // + "<br>"+ "(" + serviceDataOffers1[i].model_name
     name: serviceDataOffers1[i].name,
     y: Number(serviceDataOffers1[i].y)
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
        text: '<strong>Service<br>Offers</strong>',
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
            // distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          // startAngle: -90,
          // endAngle: -180,
          center: ['50%', '50%'],
          size: '90%',
          showInLegend: true
        }
      },
      series: [
        {
          name: 'Service',
          data:  finaljson,
         
          type: 'pie',
          innerSize: '50%',
        }]
    });
    this.donutChart = donut;

}

}
