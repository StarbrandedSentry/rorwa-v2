import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ebook } from '../models/ebook.model';

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  ebooks$: Observable<Ebook[]>;
  private _ebooks: Ebook[];

  ebookCollection: AngularFirestoreCollection<
    Ebook
  > = this.afFirestore.collection('ebooks');

  constructor(private afFirestore: AngularFirestore) {
    this.ebooks$ = this.afFirestore
      .collection('ebooks')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Ebook;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
    this.ebooks$.subscribe(ebooks => {
      this._ebooks = ebooks;
    });
  }

  addNewEbook(ebook: Ebook) {
    return this.ebookCollection.add(ebook);
  }

  get ebooks() {
    return this._ebooks;
  }
}
