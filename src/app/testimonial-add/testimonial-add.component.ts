
import { Component, OnInit,Input } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-testimonial-add',
  templateUrl: './testimonial-add.component.html',
  styleUrls: ['./testimonial-add.component.scss'],
  providers: [DatePipe]
})
export class TestimonialAddComponent implements OnInit {

  testimonialForm: any;
  LoginTestimonial:any;
  LoginTestimonial1:any;
  LoginTestimonial2:any;
  LoginTestimonial3:any;
  LoginTestimonial4:any;
  date:any;
  

  currentUserId = localStorage.getItem('currentUserId');
  
  // @Input() testimonialDetails = { user_description:'', user_rating:''}
  constructor(private  dialogRef:  MatDialogRef<TestimonialAddComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router, public restApi: RestApiService, private frmbuilder: FormBuilder,private http: HttpClient,
  private toastr: ToastrService,public datepipe: DatePipe) {
    
  }

  // user_description:any;
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains status of 5 stars
rating:any;  

// setStar(data:any){
//       this.rating=data+1;                               
//       for(var i=0;i<=4;i++){  
//         if(i<=data){  
//           this.starList[i]=false;  
//         }  
//         else{  
//           this.starList[i]=true;  
//         }  
//      } 
//      this.textbox= 'somevalue';
    
//  }



  ngOnInit(): void {
    this.date=new Date();
let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd H:m:s');

    this.testimonialForm = this.frmbuilder.group({
      user_description: ['', Validators.required],
      user_rating: ['', Validators.required],
      customer_id: [this.currentUserId, Validators.required],
      review_count:[1],
      review_date:[latest_date]
      });

      // this.loadLoginuserTestimonial();
  }
  public  closeMe() {
      this.dialogRef.close();
  }

  testimonial: any = [];



createTestimonial2(testimonialForm:any){
  
//  alert("hi")
  this.restApi.createTestimonial(testimonialForm).subscribe(data => {
    console.log('POST Request is successful ', data);
    this.showError();
},
error => {
    console.log('Error', error);
    this.showSuccess();
    
    
})
  
        this.closeMe();
       
}

showSuccess() {
  
  this.toastr.success('Customer Feedback Added Successfully!');
  window.setTimeout(function(){location.reload()},100)
}

showError() {
  
  this.toastr.error('Something went wrong!');
}




 
}

