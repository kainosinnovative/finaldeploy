import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { RestApiService } from "../shared/rest-api.service";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { config_url } from '../shared/customer/constant';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [DatePipe]
})
export class ContactUsComponent implements OnInit {

  contactform: any;
 ContactDataById: any;
 date: any;
 isloggedinUser = localStorage.getItem('isloggedinUser');
 registerEmailid = localStorage.getItem('registerEmailid');
 currentUsername = localStorage.getItem('currentUsername');
 shopowner = localStorage.getItem('userroleSes');
 
 



  constructor(
    private frmbuilder: FormBuilder,
    public restApi: RestApiService,
    private http: HttpClient,
   private toastr: ToastrService,
   public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("contactusfocus")).focus();
 this.date=new Date();
let current_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.contactform = this.frmbuilder.group({
      name: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileno: ['', [Validators.required, Validators.pattern(mobilePattern)]],
      message: ['', Validators.required],
      user_role: ['', Validators.required],
      lastupddt: [current_date, [Validators.required]]
      });
  }

  readcontactDataById() {
  
    let currentUserId = localStorage.getItem('currentUserId');
    return this.restApi.readCustomerDataById(currentUserId).subscribe((res)=>{
      this.ContactDataById = res
  
      
      this.ContactDataById = this.ContactDataById.data.contact
      console.log(this.ContactDataById)
      
    }
      
    
    )
    
  }

  submite(contactform:any)
    {
      
      this.http.post(config_url+'/app/AddContactUs',contactform)
     .subscribe(res => {
      
   }, (err) => {
      
    });

  this.toastr.success('Message Updated Successfully');
   //window.location.reload();
   console.log(contactform);
    }

  

  }
      
    
    
    
  


