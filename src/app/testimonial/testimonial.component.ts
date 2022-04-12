import { Component, OnInit } from '@angular/core';
// import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";
import { config_url } from '../shared/customer/constant';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  apiurlforhtm = config_url;
  // dataForm: FormGroup | undefined;
  fetchdata: any =[];
  fetchdata1: any;
  customers: any;
  constructor(private http: HttpClient,private router: Router,
    public restApi: RestApiService) { }
  ngOnInit(): void {
    this.loadtestimonials();
    // this.fetchdata = this.loadtestimonials()
  }
  loadtestimonials(){
    
    
    return this.restApi.gettestimonialData().subscribe((data: {}) => {
      // alert(data)
      this.fetchdata = data;
      this.fetchdata1 = this.fetchdata.data.testimonial;
      
      // console.log("data>>>>",this.fetchdata1)
    })
  }

  
    // this.fetchdata = this.restApi.gettestimonialData().subscribe()
    // alert(this.fetchdata)
    // this.http.get('http://localhost/MYDEALER-API/testimonialList').subscribe(
    //     data => {
           
    //         console.log('Data fetched is successful ', data);
    //     },
    //     error => {
    //         console.log('Error', error);
    //         // this.errorMsg = error;
    //     }
    // );


}
