import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() selected: EventEmitter<any> = new EventEmitter();
  onSelect(selectedItem){
    this.selected.emit(selectedItem);
  }
}
