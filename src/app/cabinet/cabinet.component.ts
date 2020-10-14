import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CabinetService } from '../services/cabinet.service';
import { User } from '../models/user';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  users: User[];
  currentUser: User;
  constructor(public cabinetService: CabinetService) { }

  ngOnInit() {
    this.currentUser = null;
    this.cabinetService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  @Output() auth: EventEmitter<any> = new EventEmitter();
  onAuth(){
    this.auth.emit(this.currentUser);

  }

  authorizate(){

    var login = (<HTMLInputElement>document.getElementById("login")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var hash = this.getHash(password);
    for(let user of this.users) {
      if(user.login === login && user.passwordHash === hash) {
        this.currentUser = user;
        break;
      }
    }
    if (this.currentUser == null){
      document.getElementById("no").style.display = "block";
      setTimeout(function(){
        document.getElementById("no").style.display = "none";
      },3000)
    }
    else{
      this.onAuth();
    }
  }

  getHash(str:string){
    var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
  }
}
