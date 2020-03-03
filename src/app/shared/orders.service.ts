import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFirestore) { }

  getOrders(userId: string) {
    return this.db.collection<Order[]>('orders').doc(userId).collection('orderItems',
    ref => ref.where('date', '==', new Date().toDateString()))
    .snapshotChanges()
    .pipe(map((document) => {
      return document.map(changes => {
        return {
          id: changes.payload.doc.id,
          ...changes.payload.doc.data()
        }
      })
    }))
  }

  updateOrderStatus(userId: string, itemId:string, status: string) {
    return this.db.collection('orders').doc(userId).collection('orderItems')
    .doc(itemId).update({ status });
  }
}
