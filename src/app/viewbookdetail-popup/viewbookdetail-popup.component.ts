import { Component, OnInit } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-viewbookdetail-popup',
  templateUrl: './viewbookdetail-popup.component.html',
  styleUrls: ['./viewbookdetail-popup.component.scss']
})
export class ViewbookdetailPopupComponent implements OnInit {
  userroleSes = localStorage.getItem('userroleSes');
  
  bookingDetailsById:any;
  bookingDetailsById1:any;
  MasterServiceData:any;
  MasterServiceData1:any;
  ViewBooking_heading:any;
  // loadmasterComboOffer:any;
  loadmasterComboOfferval:any;
  loadmasterComboOfferval1:any;
  constructor(private  dialogRef:  MatDialogRef<ViewbookdetailPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router,public restApi: RestApiService,
  public dialog: MatDialog,private http: HttpClient,private frmbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBookingByid();
    this.loadMasterService();
    this.loadmasterComboOffer();
    this.ViewBooking_heading = localStorage.getItem('ViewBooking_heading');
  }

  closeMe() {
    localStorage.removeItem("ViewBooking_id");
    localStorage.removeItem("ViewBooking_heading");
    this.dialogRef.close();
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

    loadMasterService(){
    
      return this.restApi.getMasterService().subscribe((data: {}) => {
        // alert(data)
        this.MasterServiceData = data;
        this.MasterServiceData1 = this.MasterServiceData.data.type;
        
        console.log("data>>>>",this.MasterServiceData1)
        // this.dtTrigger.next();
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
}
