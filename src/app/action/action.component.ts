import { Component,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  onSelect(selectedItem){
    this.selected.emit(selectedItem);
  }
}
