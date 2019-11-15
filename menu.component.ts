import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }
  @Input() data : any
  @Input() toggleFavorite : any
  @Input() bind : any
  text:string
  favorite_img : string
  yellowxx : boolean
  ngOnInit() {
    this.text = "https://twitter.com/intent/tweet?text="+encodeURI("The current temperature at "+this.data.weekly.city+" is "+this.data.currently.Temperature+"°F.The weather conditions are "+this.data.currently.Summary+"&hashtags=CSCI571WeatherSearch");
    console.log("this.text:",this.text)
    if (this.data.favorite){
      this.favorite_img = "../assets/star.png";
      this.yellowxx = true;
    } else{
      this.favorite_img = "../assets/star_border.png";
      this.yellowxx = false;
    }
    this.bind(this.handle)
  }
  handle = () => {
    this.ngOnInit();
  }
  ngOnChanges() {
    this.ngOnInit();
  }
}
