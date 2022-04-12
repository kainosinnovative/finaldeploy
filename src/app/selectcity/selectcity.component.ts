import { Component, OnInit,Input } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OtpverfiedComponent } from '../otpverfied/otpverfied.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selectcity',
  templateUrl: './selectcity.component.html',
  styleUrls: ['./selectcity.component.scss']
})
export class SelectcityComponent implements OnInit {
  public  dataForm: FormGroup;

  // keyword = 'name';
  
  // data1 = [
  //    {
  //      id: 1,
  //      name: 'Dakota Gaylord PhD',
  //      address: '14554 Smith Mews'
  //    },
  //    {
  //      id: 2,
  //      name: 'Maria Legros',
  //      address: '002 Pagac Drives'
  //    },
  //    {
  //      id: 3,
  //      name: 'Brandyn Fritsch',
  //      address: '8542 Lowe Mountain'
  //    },
  //    {
  //      id: 4,
  //      name: 'Glenna Ward V',
  //      address: '1260 Oda Summit'
  //    },
  //    {
  //      id: 5,
  //      name: 'Jamie Veum',
  //      address: '5017 Lowe Route'
  //    }
  // ];

  keyword = 'city_name';
  // data1 = [
  //   {
  //     id: 1,
  //     name: 'Georgia'
  //   },
  //    {
  //      id: 2,
  //      name: 'Usa'
  //    },
  //    {
  //      id: 3,
  //      name: 'England'
  //    }
  // ];
  citytype: any;
  citydata: any;

  constructor(private  dialogRef:  MatDialogRef<SelectcityComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router,public restApi: RestApiService,
  public dialog: MatDialog,private http: HttpClient,private frmbuilder: FormBuilder) {


  }   


  loadcitylist(){
    
    
    return this.restApi.getcitylist().subscribe((citylistdata: {}) => {
   
     // console.log(citylistdata)
      this.citytype = citylistdata;

      console.log(this.citytype)
  //console.log("hi")
      this.citydata = this.citytype.data.list;
      
       console.log("data>>>>",this.citydata)
    })
  }

  


  selectEvent(item:any) {
    // alert(item.city_id)
    localStorage.setItem('selectedCity',item.city_id);
    localStorage.setItem('selectedCityname',item.city_name);
    window.setTimeout(function(){location.reload()},100)
    // let selectedLaw : any = item.target.value;
  //  console.log(item.name);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    // do something when input is focused
  }

  ngOnInit(): void {
    this.dataForm = this.frmbuilder.group({
      city:['', [Validators.required]],
     
      
     
      });

      this.loadcitylist();
  }


  closeSelectCity() {
    console.log("in");
    this.dialogRef.close();
 }

//  citychange(city:any) {
   
//    let selectedLaw : any = city.target.value;
//   //  alert(selectedLaw)
//    localStorage.setItem('selectedCity',selectedLaw);
//   //  alert("hi");
//   this.dialogRef.close();
//   this.router.navigate(['/home']);
//  }

}
