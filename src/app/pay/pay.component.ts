import { Component } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  public selected;
  ngOnInit(){
    this.selected = "any";
  }
  change(value: string){
    this.selected = value;
  }
}
