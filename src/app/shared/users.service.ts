import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public db: AngularFirestore) { }

  getUser(id: string) {
    return this.db.collection('users').doc(id).valueChanges();
  }

  updateUser(user: User) {
    return this.db.collection('users').doc(user.id).update({...user});
  }

  getAllUsers() {
    return this.db.collection('users').valueChanges();
  }

  deleteUser(id: string) {
    this.db.collection('users').doc(id).delete();
  }

  getAddress(userId: string) {
    return this.db.collection('address').doc(userId).valueChanges();
  }
}
