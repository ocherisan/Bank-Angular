import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CabinetService } from '../services/cabinet.service';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  @Input() public currentUser: User;
  payments: Payment[];
  public listPayments: string;
  public meow: string;
  constructor(public cabinetService: CabinetService) { }
  ngOnInit(){
    //this.getInfoClient(1);
    this.cabinetService.getPayments().subscribe(payments => {
      this.showPayment(payments);
    });
  }
  

  /*public user = {
    name: "Вологжанина Наталья Валерьевна",
    phonenumber: "+79827149920",
    email: "vologzhanina.nataly@mail.ru",
    site: "meow.com",
    info: "Вот так и живём",
    requisites: "ИНН 23949505",
    image: "client.jpg",
    id: 1
  }*/
  showPayment(payments){
    var result = ""
    payments.forEach(payment => {
      result = result + 
      "numbercard: " + payment.numbercard + "\n"
      "mmgg: " + payment.mmgg + "\n" +
      "cvc: " + payment.cvc + "\n" +
      "email: " + payment.email + "\n" +
      "sum: " + payment.sum + "\n" +
      "comment: " + payment.comment + "\n"
      + "\n";
      console.log(payment.sum);
    });
    this.listPayments = result;
  }

  getInfoClient(id:number){
    var request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4 && request.status == 200)
        { 
          console.log(request);
        }
    }
    var body = id + '';
    request.open("POST", "http://localhost:8080/info");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = reqReadyStateChange;
    request.send(body);
    console.log(request.responseText);
  }
}
