import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';

import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

// import { Customer } from './shared/customer/customer';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { TestimonialAddComponent } from './testimonial-add/testimonial-add.component';

import {RightsidebarComponent} from './rightsidebar/rightsidebar.component'
import {NewinsertpageComponent} from './newinsertpage/newinsertpage.component'


import { OtpverfiedComponent } from './otpverfied/otpverfied.component';


import { LogoutComponent } from './logout/logout.component';
import { OnlinebookingComponent } from './onlinebooking/onlinebooking.component'


import { NgxStarRatingModule } from 'ngx-star-rating';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FileuploadComponent } from './fileupload/fileupload.component';

import { ServicesComponent } from './services/services.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ShopServiceComponent } from './shop-service/shop-service.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { ShopdashboardComponent } from './shopdashboard/shopdashboard.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ComboOffersComponent } from './combo-offers/combo-offers.component';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestinsertComponent } from './testinsert/testinsert.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatSelectModule} from '@angular/material/select';
import { SearchComponent } from './search/search.component';
// import { ShopLoginComponent } from './shop-login/shop-login.component';
import { ShoploginComponent } from './shoplogin/shoplogin.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgApexchartsModule } from "ng-apexcharts";
import { ViewbookingdetailsComponent } from './viewbookingdetails/viewbookingdetails.component';
import { ViewbookdetailPopupComponent } from './viewbookdetail-popup/viewbookdetail-popup.component';
import { PopupmodalComponent } from './popupmodal/popupmodal.component';
// import { NgChartsModule } from "ng2-charts";
// import { ChartsModule } from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {DataTablesModule} from 'angular-datatables';
import { ShopownerOnlinebookingComponent } from './shopowner-onlinebooking/shopowner-onlinebooking.component';
import { ChartModule } from 'angular-highcharts';
import { LeavefromtotimeComponent } from './leavefromtotime/leavefromtotime.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { SearchshopPopupComponent } from './searchshop-popup/searchshop-popup.component';
import { DoughnutstackblitzComponent } from './doughnutstackblitz/doughnutstackblitz.component';
import { DonutchartnewComponent } from './donutchartnew/donutchartnew.component';
// import { ChartsModule } from 'ng2-charts'


const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home Component' } },
  // { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: NewinsertpageComponent, data: { title: 'Second Component' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home Component' } },
  { path: 'shop', component:ShopComponent, data: { title: 'shopcomponent'}},
  { path: 'login', component: LoginComponent, data: { title: 'Login Component' } },
  { path: 'testimonial', component: TestimonialComponent, data: { title: 'Testimonial Component'} },
  { path: 'customercreate', component: CustomerCreateComponent, data: { title: 'Customer Create Component'} },

  { path: 'contactus', component: ContactUsComponent, data: { title: 'Contact Us'} },
  { path: 'otpverfied', component: OtpverfiedComponent, data: { title: 'Otp Verfied'}},
  { path: 'onlinebooking/:id', component: OnlinebookingComponent, data: { title: 'Online Booking'}},
  { path: 'FileuploadComponent', component: FileuploadComponent, data: { title: 'FileuploadComponent'}},
  { path: 'services', component: ServicesComponent, data: {title: 'Services component'}},
  { path: 'ShopProfile', component: ShopProfileComponent, data: {title: 'ShopProfile'}},
  { path: 'ShopService', component: ShopServiceComponent, data: {title: 'ShopService'}},
  { path: 'NewinsertpageComponent', component: NewinsertpageComponent, data: {title: 'ShopService'}},
  { path: 'ShopDashboard', component: ShopdashboardComponent, data: {title: 'Shop Dashboard'}},
  { path: 'ComboOffers', component: ComboOffersComponent, data: {title: 'Combo Offers'}},
  { path: 'test', component: TestinsertComponent, data: {title: 'test'}},
  { path: 'search/:id', component: SearchComponent, data: {title: 'search'}},
  // { path: 'shoplogin', component: ShopLoginComponent, data: {title: 'shoplogin'}}
  { path: 'shoplogin', component: ShoploginComponent, data: {title: 'shoplogin'}},
  { path: 'MyBooking', component: MyBookingComponent, data: {title: 'MyBooking'}},
  { path: 'bookingdetails/:id', component: ViewbookingdetailsComponent, data: {title: 'View Booking Details'}},
  { path: 'Popupmodal', component: PopupmodalComponent, data: {title: 'PopupmodalComponent'}},
  { path: 'shopownerOnlineBooking/:id', component: ShopownerOnlinebookingComponent, data: {title: 'ShopownerOnlinebooking'}},
  { path: 'a', loadChildren: () => import('./modulea/modulea.module').then(m => m.ModuleaModule) },
  { path: 'b', loadChildren: () => import('./moduleb/moduleb.module').then(m => m.ModulebModule) },
  { path: 'DoughnutstackblitzComponent', component: DoughnutstackblitzComponent, data: {title: 'DoughnutstackblitzComponent'}},
  { path: 'DonutchartnewComponent', component: DonutchartnewComponent, data: {title: 'DonutchartnewComponent'}},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TestimonialComponent,
    CustomerCreateComponent,
       ContactUsComponent,
         ShopComponent,
         SignupComponent,
         TestimonialAddComponent,
         RightsidebarComponent,
    NewinsertpageComponent,
    OtpverfiedComponent,
    LogoutComponent,
    OnlinebookingComponent,
    FileuploadComponent,

    ServicesComponent,
      ShopProfileComponent,
      ShopServiceComponent,
      ShopdashboardComponent,
      SelectcityComponent,
      ComboOffersComponent,
      TestinsertComponent,
      SearchComponent,
      // ShopLoginComponent
      ShoploginComponent,
      MyBookingComponent,
      ViewbookingdetailsComponent,
      ViewbookdetailPopupComponent,
      PopupmodalComponent,
      ShopownerOnlinebookingComponent,
      LeavefromtotimeComponent,
      SearchshopPopupComponent,
     
      DoughnutstackblitzComponent,
             DonutchartnewComponent,
      
      


     ],
  imports: [
    BrowserModule,
 NgSelectModule ,

    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(
      appRoutes,

{onSameUrlNavigation: 'reload',}
     // { useHash: true }

    ),

    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      timeOut: 2000,
    }),
    NgCircleProgressModule.forRoot(),
    DataTablesModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgImageSliderModule,
    MatAutocompleteModule,
    SlickCarouselModule,
    MatSelectModule,
    MatTabsModule,
    NgApexchartsModule,
    MatDatepickerModule,
    NgxChartsModule,
    DataTablesModule,
    ChartModule,
    
    // NgChartsModule
    // NgxDonutChartModule
  ],
  providers: [
    EventEmitterService,
    { provide: MAT_DATE_LOCALE, useValue: 'en' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

  ],
  bootstrap: [AppComponent]

})
export class AppModule {

  constructor(private  dialog:  MatDialog) { }



  login(){


        this.dialog.open(LoginComponent,{ data: {
        message:  "Error!!!"
        }});

}

signup(){

    this.dialog.open(SignupComponent,{ data: {
  message:  "Error!!!"
  }});

}
}