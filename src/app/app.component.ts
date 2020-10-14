import { Component, OnInit} from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public selected;
  public authorized : boolean;
  public user: User;
  title = 'project';
  ngOnInit(){
    this.selected = "pay";
    this.authorized = false;
  }
  change(value: string){
    this.selected = value;
  }
  auth(user){
    this.authorized = true;
    this.user = user;
    setTimeout(function(){
      this.authorized = false;
    window.location.reload();
    },86400);
  }
  unAuth(){
    this.authorized = false;
    window.location.reload();
  }
}

