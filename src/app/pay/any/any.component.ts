import { Component } from '@angular/core';

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.css']
})
export class AnyComponent {
  all_numbers = new RegExp("^[0-9]+$");
  constructor(){
    //document.getElementById("submit").setAttribute("disabled", "disabled");
  }

  ngOnInit(){
    document.getElementById("submit_any").setAttribute("disabled", "disabled");
  }
  any_sendData(){
    var user = {
      numbercard: (<HTMLInputElement>document.getElementById("numbercard_any")).value,
      mmgg: (<HTMLInputElement>document.getElementById("mmgg_any")).value,
      cvc: (<HTMLInputElement>document.getElementById("cvc_any")).value,
      sum: (<HTMLInputElement>document.getElementById("sum_any")).value,
      comment: this.check_comment(),
      email: (<HTMLInputElement>document.getElementById("email_any")).value
    };
    var request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4 && request.status == 200)
            document.getElementById("output").innerHTML=request.responseText;
    }
    var body = "numbercard=" + user.numbercard + 
                "&mmgg="+user.mmgg +
                "&cvc=" + user.cvc +
                "&sum=" + user.sum +
                "&comment=" + user.comment +
                "&email=" + user.email;
    request.open("POST", "http://localhost:8080/pay/any");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = reqReadyStateChange;
    request.send(body);
  }
  checkParams_any(){
    var fields = document.querySelector("form.any").querySelectorAll("input")
    var full = true;
    for(var i = 0; i < fields.length; i++){
      if (fields[i] && fields[i].value.length == 0){
        full = false;
      }
    }
    //дополнительная проверка
    if (this.numbercard_bad()  
        || this.mmgg_bad() 
        || this.cvc_bad() 
        || this.sum_bad() 
        || this.email_bad()
        ){
      full = false;
    }
    if(full) {
      document.getElementById("submit_any").removeAttribute("disabled");
    } else {    
      document.getElementById("submit_any").setAttribute("disabled", "disabled");
    }
  }
  numbercard_bad(){
    var numbercard = (<HTMLInputElement>document.getElementById("numbercard_any")).value;
    return numbercard.length != 16 || !this.all_numbers.test(numbercard);
  }
  mmgg_bad(){
    var mmgg = (<HTMLInputElement>document.getElementById("mmgg_any")).value;
    var reg = new RegExp("(0?[1-9]|1[012])\/([123][1-9])");
    return !reg.test(mmgg);
  }
  cvc_bad(){
    var cvc = (<HTMLInputElement>document.getElementById("cvc_any")).value;
    return cvc.length != 3 || !this.all_numbers.test(cvc);
  }
  sum_bad(){
    var sum = (<HTMLInputElement>document.getElementById("sum_any")).value;
    return !this.all_numbers.test(sum) || Number.parseInt(sum) < 1000 || Number.parseInt(sum) > 75000;
  }
  email_bad(){
    var email = (<HTMLInputElement>document.getElementById("email_any")).value;
    var reg = new RegExp(".+@.+\..+");
    return !reg.test(email);
  }
  check_comment(){
    var comment = (<HTMLInputElement>document.getElementById("comment_any")).value;
    var sc = comment.indexOf("<script");
    if (sc >= 0 ){
      comment = comment.replace("<script","<scccfcscript");
    }
    return comment;
  }
}
