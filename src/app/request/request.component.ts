import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  all_numbers = new RegExp("^[0-9]+$");
  constructor(){
    //document.getElementById("submit").setAttribute("disabled", "disabled");
  }

  ngOnInit(){
    document.getElementById("submit_request").setAttribute("disabled", "disabled");
  }
  checkParams_request() {
    var fields = document.querySelector("form.request").querySelectorAll("input")
    var full = true;
    for(var i = 0; i < fields.length; i++){
      if (fields[i] && fields[i].value.length == 0){
        full = false;
      }
    }
    //дополнительная проверка
    if (this.inn_bad() 
    || this.bik_bad() 
    || this.accnumber_bad() 
    || this.count_bad()
    || this.tel_bad()
    || this.email_bad()
    ){
      full = false;
    }
    if(full) {
      document.getElementById("submit_request").removeAttribute("disabled");
    } else {    
      document.getElementById("submit_request").setAttribute("disabled", "disabled");
    }
  }
  inn_bad(){
    var inn = (<HTMLInputElement>document.getElementById("inn_request")).value;
    return (inn.length != 10 && inn.length != 12) || !this.all_numbers.test(inn);
  }
  bik_bad(){
    var bik = (<HTMLInputElement>document.getElementById("bik_request")).value;
    return bik.length != 9 || !this.all_numbers.test(bik);
  }
  accnumber_bad(){
    var accnumber = (<HTMLInputElement>document.getElementById("accnumber_request")).value;
    return accnumber.length != 20 || !this.all_numbers.test(accnumber);
  }
  count_bad(){
    var count = (<HTMLInputElement>document.getElementById("count_request")).value;
    return !this.all_numbers.test(count) || Number.parseInt(count) < 1000 || Number.parseInt(count) > 75000;
  }
  tel_bad(){
    var tel = (<HTMLInputElement>document.getElementById("tel_request")).value;
    var reg = new RegExp(/^\+?\d{11}$/);
    return !reg.test(tel);
  }
  email_bad(){
    var email = (<HTMLInputElement>document.getElementById("email_request")).value;
    var reg = new RegExp(".+@.+\..+");
    return !reg.test(email);
  }
  clear(){
    (<HTMLFormElement>document.querySelector("form.request")).reset();
  }
  request_sendData(){
    var user = {
      inn: (<HTMLInputElement>document.getElementById("inn_request")).value,
      bik: (<HTMLInputElement>document.getElementById("bik_request")).value,
      accnumber: (<HTMLInputElement>document.getElementById("accnumber_request")).value,
      nds:(<HTMLSelectElement>document.getElementById("nds_request")).selectedOptions[0].value,
      count: (<HTMLInputElement>document.getElementById("count_request")).value,
      tel: (<HTMLInputElement>document.getElementById("tel_request")).value,
      email: (<HTMLInputElement>document.getElementById("email_request")).value
    };
    var request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4 && request.status == 200)
            document.getElementById("output").innerHTML=request.responseText;
    }
    var body = "inn=" + user.inn + 
                "&bik="+user.bik +
                "&accnumber=" + user.accnumber +
                "&nds=" + user.nds +
                "&count=" + user.count +
                "&tel=" + user.tel +
                "&email=" + user.email;
    request.open("POST", "http://localhost:8080/request");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = reqReadyStateChange;
    request.send(body);
  }
}
