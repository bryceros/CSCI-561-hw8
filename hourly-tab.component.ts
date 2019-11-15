import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { generate } from 'rxjs';
//import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-hourly-tab',
  templateUrl: './hourly-tab.component.html',
  styleUrls: ['./hourly-tab.component.scss']
})
export class HourlyTabComponent implements OnInit {

  constructor() { }
  @Input() data : any;
  @ViewChild('baseChart',{static:false}) private chartRef : ElementRef;
  flick : boolean = true
  chart: any;
  unit_map = {
    "temperature":"Fahrenheit",
    "pressure":"Millibars",
    "humidity":"% Humidity",
    "ozone":"Dobson Units",
    "visibility":"Miles",
    "windSpeed":"Miles per hour",
  }
  ngOnInit() {
    this.callType("temperature")
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  callType(value){
    console.log(value);
    this.generatechart(value)
  }

  barChartLabels: Label[] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  chartColors = [{ backgroundColor: ["rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)","rgb(149, 197 , 234)"]}];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  barChartOptions = {};

  generatechart(value) {
    let label_y = this.unit_map[value]
    let x = this.data[value]
    let options = {
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: '#dbd9d9'
          },
          scaleLabel: {
            display: true,
            labelString: "Time difference from current hour",
            fontColor: 'black',
          }
        }],
        yAxes: [{
          gridLines: {
            color: '#dbd9d9'
          },
          scaleLabel: {
            display: true,
            labelString: label_y,
            fontColor: 'black',
          }
        }]
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'black'
        }
      },
    };
    this.barChartOptions = options
    this.barChartData = [
      { data: x, label: value }
    ];
  }

}
