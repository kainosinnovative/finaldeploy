import { Component, OnInit,Input } from '@angular/core';
import { Inject, Injectable} from  '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

import { RestApiService } from "../shared/rest-api.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormControl } from "@angular/forms";
import { config_url } from '../shared/customer/constant';
@Injectable({
  providedIn: 'root'
})

export class Service {
  apiURL = config_url;
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    let city= localStorage.getItem('selectedCity');
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.apiURL+'/shop/getallshoplist?city_id='+city).pipe(tap(data => this.opts = data))
    
 }

}

@Component({
  selector: 'app-searchshop-popup',
  templateUrl: './searchshop-popup.component.html',
  styleUrls: ['./searchshop-popup.component.scss']
})
export class SearchshopPopupComponent implements OnInit {
  filteredOptions: Observable<any[]>;
  myControl = new FormControl();

  constructor(private service: Service,private  dialogRef:  MatDialogRef<SearchshopPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any,
  public router: Router,public restApi: RestApiService,
  public dialog: MatDialog,private http: HttpClient,private frmbuilder: FormBuilder) {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       })
    )

   }

  ngOnInit(): void {
  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter((option:any) => {
         return option.name1.toLowerCase().indexOf(val.toLowerCase()) >-1
       }))
     )
   }

   onSelFunc(option: any){
     console.log(option);
     this.router.navigate(['/search/'+option]);
     window.setTimeout(function(){location.reload()},10)
   }

   onSelFunc1(option: any){
    console.log(option);
    this.router.navigate(['/search/'+option]);
    window.setTimeout(function(){location.reload()},10)
   }


  closesearchshopPopup() {
    console.log("in");
    this.dialogRef.close();
 }
}
