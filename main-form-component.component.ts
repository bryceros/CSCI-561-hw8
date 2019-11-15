import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {STATES} from './states'
import {Cat, CatService} from '../cat.service'
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from './favorite-storage'

@Component({
  selector: 'app-main-form-component',
  templateUrl: './main-form-component.component.html',
  styleUrls: ['./main-form-component.component.scss']
})

export class MainFormComponentComponent implements OnInit {
  
  states = STATES

  form: FormGroup;
  data: any = null;
  filteredOptions: string[];
  is_valid: boolean = false;
  is_checked: boolean = false;
  isLoading:boolean = false;
  isFavClicked:boolean = false;
  isError:boolean = false;
  favoriteList:any = null;
  init:any;
  origonal_color = {
    'background-color': this.isFavClicked === true ? 'rgb(91,126,153)' : 'white',
    'color': this.isFavClicked === true ? 'white' : 'white' 
  }
  /*data : any ={
    "currently": {
      "Timezone": "America/Los_Angeles",
      "Temperature": 54,
      "Summary": "Mostly Cloudy",
      "Humidity": 0.8,
      "Pressure": 1020.4,
      "WindSpeed": 6.31,
      "Visibility": 6.044,
      "CloudCover": 0.7,
      "Ozone": 256.4,
      "seal": "https://www.ulc.org/assets/ulc/wedding-laws/state-seals/state-seal-of-washington.png"
    },
    "hourly": {
      "temperature": [
        53.59,
        54.75,
        54.78,
        54.11,
        52.58,
        50.6,
        49.11,
        47.85,
        47.14,
        46.81,
        46.5,
        46.01,
        45.48,
        45.08,
        44.94,
        44.29,
        43.3,
        42.44,
        41.7,
        42.02,
        43.52,
        46.08,
        48.94,
        51.61
      ],
      "pressure": [
        1020.9,
        1020.1,
        1019.1,
        1018.6,
        1017.9,
        1017.5,
        1017.2,
        1017,
        1017.2,
        1017,
        1017.2,
        1016.5,
        1016.1,
        1016.2,
        1016,
        1016.4,
        1016.4,
        1016,
        1015.7,
        1015.5,
        1015.7,
        1015.8,
        1015.9,
        1016
      ],
      "humidity": [
        0.83,
        0.79,
        0.8,
        0.81,
        0.84,
        0.87,
        0.89,
        0.94,
        0.94,
        0.93,
        0.92,
        0.92,
        0.93,
        0.94,
        0.94,
        0.92,
        0.94,
        0.94,
        0.94,
        0.94,
        0.92,
        0.87,
        0.82,
        0.76
      ],
      "ozone": [
        256.7,
        256.3,
        256.3,
        256.8,
        257.7,
        259.3,
        261.5,
        263.4,
        264.8,
        265.9,
        267,
        268.2,
        269.4,
        270.3,
        270.7,
        270.8,
        271.1,
        272.6,
        274.2,
        274,
        270.2,
        264.7,
        260.5,
        259.1
      ],
      "visibility": [
        5.662,
        6.613,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
      ],
      "windSpeed": [
        6.17,
        6.39,
        6.56,
        6.46,
        5.79,
        5.63,
        5.43,
        5.17,
        4.72,
        4.41,
        4.04,
        3.75,
        3.32,
        3.01,
        2.96,
        2.42,
        2.31,
        2.47,
        2.56,
        2.92,
        3.37,
        3.76,
        4.15,
        4.4
      ]
    },
    "weekly": {
      "time": [
        1573632000,
        1573718400,
        1573804800,
        1573891200,
        1573977600,
        1574064000,
        1574150400
      ],
      "temperature": [
        [
          41.18,
          55.38
        ],
        [
          46.82,
          57.54
        ],
        [
          46.41,
          55.55
        ],
        [
          49.41,
          55.45
        ],
        [
          48.83,
          56.08
        ],
        [
          46.4,
          57.15
        ],
        [
          40.11,
          51.7
        ]
      ],
      "coord": {
        "lat": 47.6666588,
        "lng": -122.3769835
      },
      "city": "Seattle"
    },
    "state":"WA",
    "favorite":false
  }*/
  constructor(private cat : CatService,private localStorageService: LocalStorageService) { }
  //constructor() { }

  ngOnInit() {
    //this.localStorageService.clear();
    this.favoriteList = this.localStorageService.getOnLocalStorageList();
    this.form = new FormGroup({
      street: new FormControl("",[isNotEmptyOrSpacesValidator]),
      city: new FormControl("", [isNotEmptyOrSpacesValidator]),
      state: new FormControl(""),
      current_location: new FormControl(false)
    });
    this.form.controls.city.valueChanges
    .pipe(
      debounceTime(5000),
      tap(() => {
        this.filteredOptions = [];
        this.isLoading = true;
        this.isFavClicked = false; 
        this.isError = false;
      }),
      switchMap((value:string) => this.cat.getCat(value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      this.filteredOptions = data;
    });
    this.onChanges();
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      if (val["current_location"]){
          this.is_checked = true;
          this.is_valid = true;
        } else if (isNotEmptyOrSpaces(val["street"]) && isNotEmptyOrSpaces(val["city"])){
          this.is_valid = true;
        } else {
          this.is_valid = false;
          this.is_checked = false;
        }
    });
  }
  onSubmit(value){
    this.isLoading = true;
    this.isFavClicked = false;
    this.isError = false;
    if(value.current_location == false){ 
      this.cat.sendMainForm(value).subscribe(
        data => {
          if(data == null){this.isFavClicked = false;     
            this.isError = true;
            this.isLoading = false;}
          this.data = null;
          this.data = data;
          this.data.weekly.city = value['city']
          this.data.currently.City = value['city']
          this.data.state = value['state']
          if(this.localStorageService.checkOnLocalStorage({"city":this.data.weekly.city,"state":this.data.state})){
            this.data.favorite = true; 
          } else{
            this.data.favorite = false; 
          }
          this.isFavClicked = false; 
          this.isError = false;    
          this.isLoading = false;
          console.log('onSubmit:',this.data);
        },
        error => {
          this.isFavClicked = false;     
          this.isError = true;
          this.isLoading = false;
        }
      );
    } else{
      this.cat.sendLocation().subscribe(
        data => {
          console.log('ip-json:',data);
          let city = data['city'];
          let state = data['region'];
          let coord = {'lat':data['lat'],'lng':data['lon'],'state':state}
          this.cat.sendMainForm_CL(coord).subscribe(
            data2=>{
              if(data == null){this.isFavClicked = false;     
                this.isError = true;
                this.isLoading = false;}
                this.data = null;
                this.data = data2;
                this.data.weekly.city = city
                this.data.state = state
                this.data.currently.City = city
                if(this.localStorageService.checkOnLocalStorage({"city":this.data.weekly.city,"state":this.data.state})){
                  this.data.favorite = true; 
                } else{
                  this.data.favorite = false; 
                }
                this.isFavClicked = false; 
                this.isError = false;    
                this.isLoading = false;
                console.log('onSubmitcl:',this.data);
              },
              error => {
                this.isFavClicked = false;     
                this.isError = true;
                this.isLoading = false;
            }
          )
        }
      )
    }
  }
  
  onClear(){
    this.form.controls.street.setValue('');
    this.form.controls.city.setValue('');
    this.form.controls.state.setValue('');
    this.form.controls.current_location.setValue(false);
    this.is_valid = false;
    this.is_checked = false;
    this.isFavClicked = false;
  }
  toggleFavorite = () =>{
    console.log('toggleFavorite:');
    if(this.data.favorite == false){
      this.data.favorite = true;
      this.favoriteList = this.localStorageService.storeOnLocalStorage({"seal":this.data.currently.seal,"city":this.data.weekly.city,"state":this.data.state});
      console.log('favoriteList:',this.favoriteList)
      this.init();
    } else{
      this.deleteFavorite({"city":this.data.weekly.city,"state":this.data.state})
    }
  }
  deleteFavorite =(fav_info) =>{
    console.log('toggleFavorite:');
    this.favoriteList = this.localStorageService.deleteOnLocalStorage(fav_info);
    if(this.data.weekly.city.toLowerCase() == fav_info.city.toLowerCase()
    && this.data.state.toLowerCase() == fav_info.state.toLowerCase()){
      this.data.favorite = false;
      this.init(); 
    } 
  }
  bind = (func)=>{
    this.init = func;
  }
  FavClicked(){
    this.isFavClicked = true;
  }
}

function isNotEmptyOrSpaces (val : string) {
  return (val !== undefined && val.match(/\S/) != null)
}
function isNotEmptyOrSpacesValidator(control: AbstractControl): { [key: string]: boolean } {
 
  if (!isNotEmptyOrSpaces(control.value)) {
      return { 'text': true };
  }
  return { 'text': false };
}
