import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { R3TargetBinder } from '@angular/compiler';
import {Cat, CatService} from '../cat.service'
//import * as moment from 'moment';
@Component({
  selector: 'app-weekly-tab',
  templateUrl: './weekly-tab.component.html',
  styleUrls: ['./weekly-tab.component.scss']
})
export class WeeklyTabComponent implements OnInit {

  constructor(private cat : CatService) { }
  @Input() data : any;
  selected_weather : any;
  
  ngOnInit() {
    let dataPoints = [];
    for ( let i = 0; i < this.data.time.length; i++ ) {		  
      dataPoints.push({ x: i, y:this.data.temperature[i], label: this.formatDate(this.data.time[i]),click: this.sendWeatherTime})
    }
    CanvasJS.addColorSet("blue_color", ['rgb(149, 197 , 234)','rgb(149, 197 , 234)','rgb(149, 197 , 234)','rgb(149, 197 , 234)','rgb(149, 197 , 234)','rgb(149, 197 , 234)','rgb(149, 197 , 234)'])

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Weekly Weather"
      },
      axisX: {
        title: "Days",
        reversed: true
        
      },
      axisY: {
        title: "Temperature in Fahrenheit",
        includeZero: false,
        gridThickness: 0,
        stripLines: [
          {
            value: 0,
            showOnTop: true,
            color: "black",
            thickness: 2
          }
        ]
      }, 
      data: [{
        type: "rangeBar",
        showInLegend: true,
        indexLabel: "{y[#index]}",
        legendText: "Day wise temperature range",
        toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
        dataPoints: dataPoints
      }],
      colorSet: "blue_color",
      legend: {
        verticalAlign: "top"
      }
    });
      
    chart.render();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

   sendWeatherTime = (e)=>{
    let time = this.formatUnixTime(e.dataPoint.y)
    let s = this.formatDate(time)
    this.cat.sendTimeForm({"coord":this.data.coord,"time":time}).subscribe(data => {
      this.selected_weather = data;
      this.selected_weather.city = this.data.city
      console.log('sendTimeForm:',this.selected_weather);

    });
  }
  formatDate(nowDate) {
    nowDate = new Date(nowDate*1000)
    return  nowDate.getDate() +"/"+ (nowDate.getMonth() + 1) + '/'+ nowDate.getFullYear();
  }
  formatUnixTime(time_point){
    for(let i = 0; i < this.data.time.length; i++){
      console.log('time_point:',time_point)
      console.log('this.data.temperature[i]:',this.data.temperature[i])
      if(this.data.temperature[i] == time_point){
        return this.data.time[i]
      }
    }
    return this.data.time[0] 
    /*let split = nowDate.split('/')
    let year = split[2];
    let month = split[1];
    let day = split[0];
    //return (new Date(Date.UTC(year,month-1,day)).getTime()/1000).toFixed(0);
    return (new Date(year+"-"+month+"-"+day).getTime()/1000).toFixed(0);*/
  }
}

