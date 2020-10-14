import { Component } from '@angular/core';

@Component({
  selector: 'app-own',
  templateUrl: './own.component.html',
  styleUrls: ['./own.component.css']
})
export class OwnComponent {
  all_numbers = new RegExp("^[0-9]+$");
  ngOnInit(){
    document.getElementById("submit_own").setAttribute("disabled", "disabled");
  }
  checkParams_own(){
    var fields = document.querySelector("form.own").querySelectorAll("input")
    var full = true;
    for(var i = 0; i < fields.length; i++){
      if (fields[i] && fields[i].value.length == 0){
        full = false;
      }
    }
    //дополнительная проверка
    if (this.from_bad()  
        || this.bik_bad() 
        || this.accnumber_bad() 
        || this.sum_bad() 
        ){
      full = false;
    }

    if(full) {
      document.getElementById("submit_own").removeAttribute("disabled");
    } else {    
      document.getElementById("submit_own").setAttribute("disabled", "disabled");
    }
  }
  from_bad(){
    var from = (<HTMLInputElement>document.getElementById("from_own")).value;
    return (from.length != 10 && from.length != 12) || !this.all_numbers.test(from);
  }
  bik_bad(){
    var bik = (<HTMLInputElement>document.getElementById("bik_own")).value;
    return bik.length != 9 || !this.all_numbers.test(bik);
  }
  accnumber_bad(){
    var accnumber = (<HTMLInputElement>document.getElementById("account_own")).value;
    return accnumber.length != 20 || !this.all_numbers.test(accnumber);
  }
  sum_bad(){
    var sum = (<HTMLInputElement>document.getElementById("count_own")).value;
    return !this.all_numbers.test(sum) || Number.parseInt(sum) < 1000 || Number.parseInt(sum) > 75000;
  }

  clear(){
    (<HTMLFormElement>document.querySelector("form.own")).reset();
  }

  getFile(){
    var from = (<HTMLInputElement>document.getElementById("from_own")).value;
    var bik = (<HTMLInputElement>document.getElementById("bik_own")).value;
    var accnumber = (<HTMLInputElement>document.getElementById("account_own")).value;
    var sum = (<HTMLInputElement>document.getElementById("count_own")).value;
    var nds = (<HTMLSelectElement>document.getElementById("nds_own")).selectedOptions[0].value;
    var request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4 && request.status == 200)
            document.getElementById("output").innerHTML=request.responseText;
    }
    var body = "from=" + from + 
                "&bik="+bik +
                "&accnumber=" + accnumber +
                "&sum=" + sum +
                "&nds=" + nds ;
    request.open("POST", "http://localhost:8080/pay/own");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = reqReadyStateChange;
    request.send(body);
  }
}
