import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  createCategory(category: Category) {
    return this.db.collection('categories').add({...category});
  }

  getCategory(id: string) {
    return this.db.collection('categories').doc(id).get();
  }

  getCategories() {
    return this.db.collection('categories').snapshotChanges();
  }

  deleteCategory(id: string) {
    return this.db.collection('categories').doc(id).delete();
  }

  updateCategory(id: string, newCategory: Category) {
    return this.db.collection('categories').doc(id).update(newCategory);
  }
}
