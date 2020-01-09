import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Center } from '../models/center.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  centers$: Observable<Center[]>;
  private _centers: Center[];

  centerCollection: AngularFirestoreCollection<
    Center
  > = this.afFirestore.collection('centers');

  constructor(private afFirestore: AngularFirestore) {
    this.centers$ = this.afFirestore
      .collection('centers')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Center;
            data.id = a.payload.doc.id;
            return data;
          })
        )
      );
    this.centers$.subscribe(centers => {
      this._centers = centers;
    });
  }

  createCenter(center: Center) {
    return this.centerCollection.add(center);
  }

  get centers() {
    return this._centers;
  }
}
