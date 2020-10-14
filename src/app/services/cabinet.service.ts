import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from '../models/User';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  payments: Observable<Payment[]>;
  constructor(public afs: AngularFirestore) 
  { 
    this.users = <Observable<User[]>>this.afs.collection('users').valueChanges();
    this.payments = <Observable<Payment[]>>this.afs.collection('payments').valueChanges();
  }
  getUsers(){
    return this.users;
  }
  getPayments(){
    return this.payments;
  }
  auth(){
    
  }
}
