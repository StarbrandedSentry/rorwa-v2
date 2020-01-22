import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Writer } from '../models/writer.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WriterService {
  writers$: Observable<Writer[]>;
  private _writers: Writer[];

  writerCollection: AngularFirestoreCollection<
    Writer
  > = this.afFirestore.collection('writers');

  constructor(private afFirestore: AngularFirestore) {
    this.writers$ = this.afFirestore
      .collection('writers')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Writer;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
    this.writers$.subscribe(writers => {
      this._writers = writers;
    });
  }

  addNewWriter(writer: Writer) {
    return this.writerCollection.add(writer);
  }

  get writers() {
    return this._writers;
  }
}
