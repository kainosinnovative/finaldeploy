import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { TestimonialAddComponent } from '../testimonial-add/testimonial-add.component';
import { RestApiService } from "../shared/rest-api.service";
import { EventEmitterService } from '../event-emitter.service';
import { config_url } from '../shared/customer/constant';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})
export class RightsidebarComponent implements OnInit {
  
  apiurlforhtm = config_url;
  currentUsername = localStorage.getItem('currentUsername');

  userroleSes = localStorage.getItem('userroleSes');

  constructor(private  dialog:  MatDialog, private  router:  Router,public restApi: RestApiService,private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    
  }

  testimonialAdd(){
  
    this.dialog.open(TestimonialAddComponent,{disableClose: true});
 

 
}

loginToRate(){
  if(!this.userroleSes)
  {
    this.eventEmitterService.onFirstComponentButtonClick();  
   // alert("please login");
  }
}




}
