import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer, shopoffers } from '../shared/customer/customer';

import {currentuserid,Testimonial,Testimonial2,loginauth,logindetails,singleLoginTestimonial,shopCustlogin,Cartype,Services,ShopService,carbrand,citylist,statelist, shopserviceByModelid, dahsboardShop} from '../shared/customer/customer';

import { Observable, throwError } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
import { createcustomer } from '../shared/customer/customer';
import { contactdetails } from '../shared/customer/customer';
import { config_url } from '../shared/customer/constant';

@Injectable({
providedIn: 'root'
})
export class RestApiService {
apiURL = config_url;
constructor(private http:HttpClient) {}
headers = new HttpHeaders().set('Content-Type', 'application/text');
// httpOptions = {
// headers: new HttpHeaders({}),

// }
month=new Array();
year=new Array();
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Access-Control-Allow-Origin": "*",

  } ),responseType: 'text' as 'json'
};

// getData(){
//   return this.http.get('https://jsonplaceholder.typicode.com/users')
//     .pipe(
//       map((response:any) => response.map((item: { [x: string]: any; }) => item['name']))
//     )
// }
getcustomerwhislistprofile(currentUserId:any): Observable<any> {
  return this.http.get<any[]>(this.apiURL + '/app/getcustomerwhislistprofile?currentUserId='+currentUserId)
  .pipe(
    retry(1),
    catchError(this.handleError)
    )
   }

getCustomers(): Observable<Customer> {
return this.http.get<Customer>(this.apiURL + '/customers')
.pipe(
retry(1),
catchError(this.handleError)
)
}


gettestimonialData(): Observable<Testimonial> {

  return this.http.get<Testimonial>(this.apiURL + "/app/testimonialList")

  .pipe(
  retry(1),
  catchError(this.handleError)
  )
  }



  getcitylist(): Observable<citylist> {

    return this.http.get<citylist>(this.apiURL + "/app/citylist")

    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getcitylistbycityid(cityid:any): Observable<citylist> {

      return this.http.get<citylist>(this.apiURL + "/app/getcitynamebyCityid?cityid="+cityid)

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }


    getstatelist(): Observable<statelist> {

      return this.http.get<statelist>(this.apiURL + "/app/state")

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }

  getcartype(): Observable<Cartype> {

    return this.http.get<Cartype>(this.apiURL + "/app/cartype")

    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getcarbrand(): Observable<carbrand> {

      return this.http.get<carbrand>(this.apiURL + "/app/brandtype")

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }


    getServiceData(currentUserId:any): Observable<Services> {
      // alert(currentUserId)
      return this.http.get<Services>(this.apiURL + "/app/carAndShopservice?currentUserId="+currentUserId)

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }

      getServiceDataOnlineBookingModel(ServiceDataOnlineBookingModel:any): Observable<Services> {
        let model_id = ServiceDataOnlineBookingModel["model"];
        let shopid = ServiceDataOnlineBookingModel["shopid"];
                return this.http.get<Services>(this.apiURL + "/app/getServiceDataOnlineBookingModel?shopid="+shopid +
        "&model_id=" + model_id)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }

      getServiceDataOffers(currentUserId:any): Observable<Services> {
        // alert(currentUserId)
        return this.http.get<Services>(this.apiURL + "/shop/getServiceDataOffersByCurdate?currentUserId="+currentUserId)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }


        getMybookingDetails(currentUserId:any): Observable<any[]> {
          // alert(currentUserId)
          return this.http.get<any[]>(this.apiURL + "/app/getMybookingDetails?currentUserId="+currentUserId)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }


      getcustomerBookingForShop(currentUserId:any): Observable<any[]> {
        // alert(currentUserId)
        return this.http.get<any[]>(this.apiURL + "/shop/customerBookingForShop?currentUserId="+currentUserId)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }


        getAcceptedBookingList(currentUserId:any): Observable<any[]> {
          // alert(currentUserId)
          return this.http.get<any[]>(this.apiURL + "/shop/AcceptedBookingList?currentUserId="+currentUserId)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }


        getmaster_pickdrop_status(): Observable<any[]> {
          // alert(currentUserId)
          return this.http.get<any[]>(this.apiURL + "/shop/master_pickdrop_status")

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }


          getmaster_carwash_status(): Observable<any[]> {
            // alert(currentUserId)
            return this.http.get<any[]>(this.apiURL + "/shop/master_carwash_status")

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }


      combooffertblByModelid(combooffertbl:any): Observable<shopserviceByModelid> {
      //  alert(combooffertbl)
      let model_id = combooffertbl["model_id"];
      let shopid = combooffertbl["shop_id"];
  // alert(shopid)
        return this.http.get<shopserviceByModelid>(this.apiURL + "/shop/combooffertblByModelid?currentUserId="+shopid +
        "&model_id=" + model_id)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }


        shopserviceByModelid(shopid:any): Observable<shopserviceByModelid> {

          return this.http.get<shopserviceByModelid>(this.apiURL + "/shop/shopserviceByModelid?currentUserId="+shopid)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }



          CarDetailsById(customer_id:any): Observable<any[]> {

            return this.http.get<any[]>(this.apiURL + "/app/CarDetailsByCustomerId?customer_id="+customer_id)

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }


            CarDetailsByIdShopOnlineBooking(customer_id:any): Observable<any[]> {

              return this.http.get<any[]>(this.apiURL + "/app/CarDetailsByIdShopOnlineBooking?customer_id="+customer_id)

              .pipe(
              retry(1),
              catchError(this.handleError)
              )
              }


            carDetByModelId(carDetByModelId:any): Observable<any[]> {
              let model = carDetByModelId["model"];
              let currentUserId = carDetByModelId["currentUserId"];

              return this.http.get<any[]>(this.apiURL + "/app/carDetByModelId?model="+model +
              "&currentUserId=" + currentUserId)

              .pipe(
              retry(1),
              catchError(this.handleError)
              )
              }

              getcustomerByCityId(currentLogincity:any): Observable<any[]> {


                return this.http.get<any[]>(this.apiURL + "/app/getcustomerByCityId?cityid="+currentLogincity)

                .pipe(
                retry(1),
                catchError(this.handleError)
                )
                }


            RemoveMyCarInfo(carinfo_id:any): Observable<any[]> {
              // alert(carinfo_id)
              return this.http.get<any[]>(this.apiURL + "/app/RemoveMyCarInfo?carinfo_id="+carinfo_id)

              .pipe(
              retry(1),
              catchError(this.handleError)
              )
              }
              RemoveMyComboInfo(offerid:any):Observable<any[]> {
                // alert(carinfo_id)
                return this.http.get<any[]>(this.apiURL + "/shop/RemoveMyComboOffer?offerid="+offerid)

                .pipe(
                retry(1),
                catchError(this.handleError)
                )
                }

          dashboardShop(cityid:any): Observable<dahsboardShop> {

            return this.http.get<dahsboardShop>(this.apiURL + "/shop/dashboardShopList?cityid="+cityid)

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }
            dashboardShopSearch(shopname:any,cityid:any): Observable<dahsboardShop> {

              return this.http.get<dahsboardShop>(this.apiURL + "/shop/dashboardShopSearch?shopname="+shopname+
              "&cityid=" + cityid)

              .pipe(
              retry(1),
              catchError(this.handleError)
              )
              }
              dashboardShopSearchoffer(shopname:any,cityid:any): Observable<dahsboardShop> {

                return this.http.get<dahsboardShop>(this.apiURL + "/shop/dashboardShopSearchOffer?shopname="+shopname+
                "&cityid=" + cityid)

                .pipe(
                retry(1),
                catchError(this.handleError)
                )
                }

            dashboardShopDetailsByOffer(cityid:any): Observable<dahsboardShop> {

              return this.http.get<dahsboardShop>(this.apiURL + "/shop/dashboardShopDetailsByOffer?cityid="+cityid)

              .pipe(
              retry(1),
              catchError(this.handleError)
              )
              }



      getComboOffersData(val:any,val1:any,currentUserId:any): Observable<Services> {

        // alert(currentUserId)
        // let month=monyear["month"];
        // let year=monyear["year"];
        // let currentId=monyear["currentUserId"];

         this.month=val;
         this.year=val1;
        let currentId=currentUserId;
        return this.http.get<Services>(this.apiURL + "/shop/getComboOffersByShopid?month="+this.month+
        "&year="+this.year+
        "&id="+currentId)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }


        getMasterServiceAndShopService(currentUserId:any): Observable<any[]> {
          // alert(currentUserId)
          return this.http.get<any[]>(this.apiURL + "/shop/MasterServiceAndShopService?currentUserId="+currentUserId)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }


          getMasterService(): Observable<Services> {
            // alert(currentUserId)
            return this.http.get<Services>(this.apiURL + "/app/services")

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }


          getAllModels(): Observable<Services> {
            // alert(currentUserId)
            return this.http.get<Services>(this.apiURL + "/app/allmodels")

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }


      AddshopService(shopservAmount:any): Observable<ShopService> {
        // alert(shopservAmount)
        let serviceid = shopservAmount["serviceid"];
      let service_amount = shopservAmount["service_amount"];
      let currentUserId = shopservAmount["currentUserId"];
        return this.http.get<ShopService>(this.apiURL + "/shop/AddshopService?service_amount="+service_amount +
         "&serviceid=" + serviceid + "&currentUserId="+currentUserId)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }



        changeServiceStatus(changeServiceStatus:any): Observable<ShopService> {
          // alert(shopservAmount)
          let shopserviceid = changeServiceStatus["shopserviceid"];
        let status = changeServiceStatus["status"];

          return this.http.get<ShopService>(this.apiURL + "/shop/changeShopServiceStatus?status="+status +
           "&shopserviceid=" + shopserviceid)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }

          changepickupStatus(changepickupStatus:any): Observable<ShopService> {
            // alert(shopservAmount)
            let shopid = changepickupStatus["shopid"];
             let pickupstatus = changepickupStatus["pickupstatus"];

            return this.http.get<ShopService>(this.apiURL + "/shop/updatepickupdrop?pickupdropstatus="+pickupstatus +
             "&shop_id=" + shopid)

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }


          vehicleBasedModel(vehicle_number:any): Observable<any[]> {
            // alert(shopservAmount)


            return this.http.get<any[]>(this.apiURL + "/app/getCarinfomodels?vehicle_number="+vehicle_number)

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }




  createTestimonial(testimonialData: any): Observable<Testimonial2>{
    return this.http.post<Testimonial2>(`${this.apiURL}/app/AddTestimonial`, testimonialData);
  }

  createcustomer(customerData: any): Observable<createcustomer>{
    return this.http.post<createcustomer>(`${this.apiURL}/app/Addcustomer`, customerData);
  }


  AddComboOfferDetails(ComboOfferDetails:any): Observable<ShopService> {
    // alert(shopservAmount)
    let services = ComboOfferDetails["services"];
  let combo_price = ComboOfferDetails["combo_price"];
  let shop_id = ComboOfferDetails["shop_id"];
  let offer_percent = ComboOfferDetails["offer_percent"];
  let start_date = ComboOfferDetails["start_date"];
  let end_date = ComboOfferDetails["end_date"];
  let model_id = ComboOfferDetails["model_id"];
  let original_amount = ComboOfferDetails["original_amount"];
  let offer_name=ComboOfferDetails["offer_name"];
    return this.http.get<ShopService>(this.apiURL + "/shop/AddComboOfferDetails?services="+services +
     "&combo_price=" + combo_price + "&shop_id="+shop_id +"&offer_percent=" + offer_percent + "&start_date="+start_date +
     "&end_date=" + end_date + "&model_id=" + model_id + "&original_amount=" + original_amount + "&offer_name=" + offer_name)

    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }


//     return this.http.post('http://localhost:3000/api/Users/login', data, httpOptions)
//    .do( function(resp) {
//         self.setSession(resp);
//  });

    loginauth(AuthData: { mobno: any;}):
    Observable<loginauth> {
      // console.log("res>>>>",Response)
    return this.http.post<loginauth>(this.apiURL + '/app/sendOtp2', AuthData,
    this.httpOptions)
    // .do( function(resp: any) {
    //   self.setSession(response);
    .pipe(map( (response: any) => response ),
    retry(1), // <- return response
    catchError(this.handleError),
    // retry(1),
    // catchError(this.handleError)
    )
    // console.log("res>>>>",Response)
    }

    signup(AuthData:any):
    Observable<loginauth> {

    return this.http.post<loginauth>(this.apiURL + '/app/signupCustomer', AuthData,
    this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getCustomerData(jsonObject:any): Observable<shopCustlogin> {
      // console.log("mob>>>",jsonObject);
      let customer_mobileno = jsonObject["isloggedinUser"];
      let loginfor = jsonObject["loginfor"];
      // var finalstr = customer_mobileno + "" + loginfor;
      // alert("loginfor>>>"+loginfor)
      // alert("customer_mobileno>>>"+customer_mobileno);

      return this.http.get<shopCustlogin>(this.apiURL + '/app/SingleCustomerDetails?customer_mobileno='+customer_mobileno+'&loginfor='+loginfor)

      .pipe(
        retry(1),
        catchError(this.handleError)

      )


    }


    OnlineBookingInsertFn(onlinebooking	:any): Observable<any[]> {
      // alert(onlinebooking)
      console.log("onlinebooking from service>>>",onlinebooking)
      return this.http.post<any[]>(this.apiURL + '/onlinebooking/addonlinebooking', onlinebooking,
    this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
      // this.http.post<any[]>(this.apiURL + '/app/SingleLoginTestimonial')

      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)

      // )

    }


getCustomer(id:any): Observable<Customer> {
    // alert("phone"+phone)
    // alert("phone"+this.apiURL + '/customers/' + phone)
    return this.http.get<Customer>(this.apiURL + '/customers/' + id)

    .pipe(
      retry(1),
      catchError(this.handleError)

    )

  }


  updateCustomer(id:any, employee:any): Observable<Customer> {
    return this.http.put<Customer>(this.apiURL + '/customers/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // read user data
  // readCustomerDataById(currentUserId:any): Observable<createcustomer>{
  //   return this.http.get<createcustomer>(`${this.apiURL}/app/readCustomerDataById`);
  // }

  readCustomerDataById(currentUserId	:any): Observable<logindetails> {
    console.log("api>>>",currentUserId);
    // alert("phone"+customer_mobileno)
    // alert("phone"+this.apiURL + '/customers/' + phone)
    return this.http.get<logindetails>(this.apiURL + '/app/readCustomerDataById?customer_id='+ currentUserId	)

    .pipe(
      retry(1),
      catchError(this.handleError)

    )

  }

createCustomer(employee: { name: string; email: string; phone: number; gender: string;doorno: string; street: string;
area: string; Pincode: string; city: string; landmark: string;}):
Observable<Customer> {
  // alert(employee)
return this.http.post<Customer>(this.apiURL + '/customers', JSON.stringify(employee),
this.httpOptions)
.pipe(
retry(1),
catchError(this.handleError)
)
}
handleError(error:any) {
let errorMessage = '';
if(error.error instanceof ErrorEvent) {
// Get client-side error
errorMessage = error.error.message;
} else {
// Get server-side error
errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
window.alert(errorMessage);
return throwError(errorMessage);
}


readShopProfileDataById(currentShopId	:any): Observable<logindetails> {

  return this.http.get<logindetails>(this.apiURL + '/shop/getShopProfileById?shop_id='+ currentShopId	)

  .pipe(
    retry(1),
    catchError(this.handleError)

  )

}

ShopoffersById(onlinebookingcombo:any): Observable<shopoffers> {
  let model = onlinebookingcombo["model"];
      let shopid = onlinebookingcombo["shopid"];

  return this.http.get<shopoffers>(this.apiURL +'/shop/OnlineBookingShopDetails?shopid='+ shopid +'&model='+model )

  .pipe(
    retry(1),
    catchError(this.handleError)

  )

}
getCustomerWhislist(customerid:any,selectedcity:any) : Observable<any[]>
{

 return this.http.get<any>(this.apiURL +'/app/customerwhislist?currentUserId='+ customerid+
 '&city_id='+selectedcity)

  .pipe(
    retry(1),
    catchError(this.handleError)

  )


}

getallshoplist() : Observable<any[]>
{

 return this.http.get<any>(this.apiURL +"/shop/getallshoplist")

  .pipe(
    retry(1),
    catchError(this.handleError)

  )


}

loadmasterComboOffer() : Observable<any[]>
{

 return this.http.get<any>(this.apiURL +"/shop/getloadmasterComboOffer")

  .pipe(
    retry(1),
    catchError(this.handleError)

  )


}



changeBookingStatus(changeBookingStatus:any): Observable<any[]> {
  // alert(shopservAmount)
  let booking_status = changeBookingStatus["booking_status"];
let Booking_id = changeBookingStatus["Booking_id"];
let pickup_drop = changeBookingStatus["pickup_drop"];

  return this.http.get<any[]>(this.apiURL + "/shop/changeBookingStatus?booking_status="+booking_status +
   "&Booking_id=" + Booking_id + "&pickup_drop=" + pickup_drop)

  .pipe(
  retry(1),
  catchError(this.handleError)
  )
  }



  insertShopHolidays(holidaysArr:any): Observable<any[]> {
    // alert(shopservAmount)
    let selectedDateArr = holidaysArr["selectedDateArr"];
  let currentUserId = holidaysArr["currentUserId"];


    return this.http.get<any[]>(this.apiURL + "/shop/insertShopHolidays?leave_date="+selectedDateArr +
     "&currentUserId=" + currentUserId)

    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

  changeCarwashStatus(changeCarwashStatus:any): Observable<any[]> {
    // alert(shopservAmount)
    let carwash_status = changeCarwashStatus["carwash_status"];
  let Booking_id = changeCarwashStatus["Booking_id"];


    return this.http.get<any[]>(this.apiURL + "/shop/changeCarwashStatus?carwash_status="+carwash_status +
     "&Booking_id=" + Booking_id)

    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

    getcombocustomerinfo(currentUserId:any): Observable<any[]> {
// alert(currentUserId)
      return this.http.get<any[]>(this.apiURL + "/shop/chartcustomercombo?currentUserId="+currentUserId)

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }
    getcurrentComboOffersByShopid(currentUserId:any): Observable<any[]> {

      return this.http.get<any[]>(this.apiURL + "/shop/getcurrentComboOffersByShopid?currentUserId="+currentUserId)

      .pipe(
      retry(1),
      catchError(this.handleError)
      )
      }

      getBookingDetailsById(Booking_id:any): Observable<any[]> {

        return this.http.get<any[]>(this.apiURL + "/shop/getBookingDetailsById?Booking_id="+Booking_id)

        .pipe(
        retry(1),
        catchError(this.handleError)
        )
        }

        getShopHolidays(currentShopId	:any): Observable<logindetails> {

          return this.http.get<logindetails>(this.apiURL + '/shop/getShopHolidays?shop_id='+ currentShopId	)

          .pipe(
            retry(1),
            catchError(this.handleError)

          )

        }


        getholidaysForAll(): Observable<any[]> {

          return this.http.get<any[]>(this.apiURL + '/shop/getholidaysForAll')

          .pipe(
            retry(1),
            catchError(this.handleError)

          )

        }

        DeleteHolidays(holidaysData:any): Observable<any[]> {
          // alert(shopservAmount)
          let holidayid = holidaysData["holidayid"];



          return this.http.get<any[]>(this.apiURL + "/shop/DeleteHolidays?holidayid="+holidayid)

          .pipe(
          retry(1),
          catchError(this.handleError)
          )
          }

          getcurrentComboOffersByShopiddashboard(currentUserId:any): Observable<any[]> {

            return this.http.get<any[]>(this.apiURL + "/shop/getcurrentComboOffersByShopiddashboard?currentUserId="+currentUserId)

            .pipe(
            retry(1),
            catchError(this.handleError)
            )
            }
}
