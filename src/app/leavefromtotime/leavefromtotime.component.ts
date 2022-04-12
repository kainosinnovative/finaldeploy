import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from "../shared/rest-api.service";
import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';
import { config_url } from '../shared/customer/constant';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leavefromtotime',
  templateUrl: './leavefromtotime.component.html',
  styleUrls: ['./leavefromtotime.component.scss'],
  providers: [DatePipe]
})
export class LeavefromtotimeComponent implements OnInit {
  public  dataForm: FormGroup;
  holidayDateselected:any;
  constructor(private  dialogRef:  MatDialogRef<LeavefromtotimeComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router,public restApi: RestApiService,
  public dialog: MatDialog,private http: HttpClient,private frmbuilder: FormBuilder,
  private toastr: ToastrService, public datepipe: DatePipe) { }
  date:any;
  current_date:any;
  ngOnInit(): void {
    this.holidayDateselected = localStorage.getItem('holidayDateselected');
    this.date=new Date();
     this.current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

    this.dataForm = this.frmbuilder.group({
      leave_timing_from:['',[Validators.required]],
      leave_timing_to:['',[Validators.required]],
      leave_date:[localStorage.getItem('holidayDateselected'),[Validators.required]],
      shop_id:[localStorage.getItem('currentUserId'),[Validators.required]],
      lastupddt:[this.current_date,[Validators.required]],
      });
  }

  closeMe() {
    this.dialogRef.close();
 }
 holidaysUpdate(dataForm:any) {
   console.log(dataForm);
   this.http.post(config_url+'/shop/holidaytimeupdate',dataForm)
   .subscribe(res => {
   console.log("res>>>>>",res);
   }, (err) => {
     console.log("err>>>>>",err);
     if(err.status == 200) {
       this.toastr.success('Holidays updated');
       
       window.setTimeout(function(){location.reload()},100)
       
     }
 });
 }
}
