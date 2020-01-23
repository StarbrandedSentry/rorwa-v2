import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/misc.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$: Observable<Category[]>;
  private _categories: Category[];
  categoriesCollection: AngularFirestoreCollection;

  constructor(private afFirestore: AngularFirestore) {
    this.categoriesCollection = this.afFirestore.collection('categories');
    this.categories$ = this.categoriesCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );

    this.categories$.subscribe(categories => {
      this._categories = categories;
    });
  }

  addCategory(categoryName: string) {
    const newCategory: Category = {
      name: categoryName
    };
    return this.categoriesCollection.add(newCategory);
  }

  get categories() {
    return this._categories;
  }
}
