import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators, FormControl,} from '@angular/forms';
//import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute,ParamMap, Params  } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { config_url } from '../shared/customer/constant';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewbookingdetails',
  templateUrl: './viewbookingdetails.component.html',
  styleUrls: ['./viewbookingdetails.component.scss']
})
export class ViewbookingdetailsComponent implements OnInit {
  bookingDetailsById:any;
  bookingDetailsById1:any;
  constructor(public restApi: RestApiService,
    private frmbuilder: FormBuilder,
    private http: HttpClient,
    
    private router: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
     this.getBookingByid(id)
})
  }

  getBookingByid(Booking_id:any) {
// alert(Booking_id)
return this.restApi.getBookingDetailsById(Booking_id).subscribe((data: {}) => {
  // alert(data)
  this.bookingDetailsById = data;
  //console.log("abi", this.shopdetails);
  //  this.bookingDetailsById1 = this.bookingDetailsById.data;
  
   console.log("bookingDetails1>>>>",this.bookingDetailsById)
  
})
  }

}
