var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyCgi8Lqnrci_a6Aa6FbW6HxEH2RUd5Fi9Q",
    authDomain: "webproject-f2e8a.firebaseapp.com",
    databaseURL: "https://webproject-f2e8a.firebaseio.com",
    projectId: "webproject-f2e8a",
    storageBucket: "webproject-f2e8a.appspot.com",
    messagingSenderId: "82032064571"
  };
  firebase.initializeApp(config);

var paymentsRef = firebase.firestore().collection('payments');
var requestsRef = firebase.firestore().collection('requests');
var usersRef = firebase.firestore().collection('users');
var http = require("http");
var server = new http.Server();
server.listen(8080, '127.0.0.1');
server.on('request', function(req, res){
    if (req.url === "/pay/any"){
        
        req.on('data', (data) => { // Пришла информация - записали.
            var str = (data + "").split('&');
            fulldata = [];
            str.forEach(element => {
                var e = element.split('=');
                fulldata[e[0]] = e[1];
            });
            savePayments(fulldata["numbercard"],fulldata["mmgg"],fulldata["cvc"],
                fulldata["sum"],fulldata["comment"],fulldata["email"]);
        });
        res.end(0);
    }
    else if (req.url === "/info"){
        //var newUsersRef = usersRef.doc("/2").onSnapshot(,);
        console.log(newUsersRef);
    }
    else if (req.url === "/pay/own"){
        req.on('data', (data) => { // Пришла информация - записали.
            var str = (data + "").split('&');
            fulldata = [];
            str.forEach(element => {
                var e = element.split('=');
                fulldata[e[0]] = e[1];
            });
            createFile(fulldata["from"],fulldata["bik"],fulldata["accnumber"],
                fulldata["sum"],fulldata["nds"]);
        });
        res.end();
    }
    else if (req.url === "/request"){
        req.on('data', (data) => { // Пришла информация - записали.
            var str = (data + "").split('&');
            fulldata = [];
            str.forEach(element => {
                var e = element.split('=');
                fulldata[e[0]] = e[1];
            });
            saveRequests(fulldata["inn"],fulldata["bik"],fulldata["accnumber"], fulldata["nds"],
                fulldata["count"],fulldata["tel"],fulldata["email"]);
        });
        res.end(0);
    }

    //console.log(req);
})

function savePayments(numbercard, mmgg, cvc, sum, comment, email){
    var newPaymentsRef = paymentsRef.doc();
    newPaymentsRef.set({
        numbercard: numbercard,
        mmgg : mmgg,
        cvc: cvc,
        sum: sum,
        comment: comment,
        email: email
    })
}

function createFile(from,bik,accnumber,sum,nds){
    var fs = require("fs");
    fs.writeFile("file.html", 
    '<html><head><meta charset="utf-8"></head><body> От кого: ' + from +
    "<br>БИК: " + bik + "<br>Номер счёта: " + accnumber + "<br>Сумма: " + sum + "<br>НДС: " + nds + "%" +
    "</body></html>",
        function(err){
            
        });
}

function saveRequests(inn, bik, accnumber, nds, count, tel, email){
    var newRequestsRef = requestsRef.doc();
    newRequestsRef.set({
        inn: inn,
        bik : bik,
        accnumber: accnumber,
        nds: nds,
        count: count,
        tel: tel,
        email: email
    })
}