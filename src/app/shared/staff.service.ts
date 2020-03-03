import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public db: AngularFirestore) { }

  createStaff(staff: Staff) {
    return this.db.collection('staff').add({...staff});
  }

  getStaff(id: string) {
    return this.db.collection('staff').doc(id).valueChanges();
  }

  getAllStaff() {
    return this.db.collection('staff').valueChanges();
  }

  deleteStaff(id: string) {
    return this.db.collection('staff').doc(id).delete();
  }
}
