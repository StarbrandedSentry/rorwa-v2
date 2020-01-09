import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Center } from '../models/center.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  centers$: Observable<Center[]>;
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
  }

  createCenter(center: Center) {
    return this.centerCollection.add(center);
  }

  getCenters() {
    return this.centers$;
  }
}
