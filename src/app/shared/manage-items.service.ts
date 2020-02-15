import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../models/item.model';
import { Stock } from '../models/stock.model';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ManageItemsService {

  constructor(private db: AngularFirestore) { }

  createItem(item: Item) {
    this.db.collection('items').add({ ...item })
    .then(itemRef => {
      console.log('item id:', itemRef.id);
      let stock: Stock = {
        stock: 25
      };
      this.updateStock(itemRef.id, stock);
    }).catch( error => console.log('Item insertion Failed:', error));
  }

  getItem(id: string) {
    return this.db.collection('items').doc(id).get();
  }

  getItems() {
    return this.db.collection('items').snapshotChanges();
  }

  deleteItem(id: string) {
    this.db.collection('items').doc(id).delete();
  }

  updateItem(id: string, newItem: Item) {
    this.db.collection('items').doc(id).update(newItem);
  }

  updateStock(id: string, stock: Stock) {
    this.db.collection('stock').doc(id).set(stock);
  }

  getStock(id: string) {
    return this.db.collection('stock').doc(id).valueChanges();
  }

  getAllStocks() {
    return this.db.collection('stock').valueChanges();
  }



}
