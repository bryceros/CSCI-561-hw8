import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currently-tab',
  templateUrl: './currently-tab.component.html',
  styleUrls: ['./currently-tab.component.scss']
})
export class CurrentlyTabComponent implements OnInit {

  constructor() { }
  @Input() data : any
  temperature_img = "https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png"; 
  humidity_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png";
  pressure_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png";
  windSpeed_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png";
  visibility_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png";
  cloudCover_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png";
  ozone_img = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png";
  seal_img :string
  ngOnInit() {
    this.seal_img = this.data.seal;
  }
  ngOnChanges() {
    this.ngOnInit();
  }
}
