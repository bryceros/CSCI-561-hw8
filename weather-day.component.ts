import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['./weather-day.component.scss']
})
export class WeatherDayComponent implements OnInit {
  
  constructor() { }
  @Input() selected_weather : any;
  @ViewChild('myModal',{static:true}) myModal : ElementRef;
  @ViewChild('myModalBackDrop',{static:true}) myModalBackDrop : ElementRef;

  @ViewChild('myModalClose',{static:true}) myModalClose : ElementRef;

  temperature_img = "https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png"; 
  icon = {
    "clear-day": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
    "clear-night": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png",
    "rain":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png",
    "snow":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png",
    "sleet":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png",
    "wind":  "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png",
    "fog":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png",
    "cloudy":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png",
    "partly-cloudy-day": "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png",
    "partly-cloudy-night":  "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png"
  };



  ngOnInit() {

    this.selected_weather.precipitation = parseFloat(this.selected_weather.precipitation).toFixed(2);
    this.selected_weather.chanceOfRain = parseFloat(this.selected_weather.chanceOfRain).toFixed(0);
    this.selected_weather.windSpeed = parseFloat(this.selected_weather.windSpeed).toFixed(2);
    this.selected_weather.humidity = parseFloat(this.selected_weather.humidity).toFixed(0);
    
    this.myModal.nativeElement.style.display = 'block';
    this.myModalBackDrop.nativeElement.style.display = 'block';
    this.myModalClose.nativeElement.onclick = () => {
      this.myModal.nativeElement.style.display = 'none';
      this.myModalBackDrop.nativeElement.style.display = 'none';
    };
  }
  ngOnChanges() {
    this.ngOnInit();
  }

}
