import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Center } from '../models/center.model';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  centerCollection: AngularFirestoreCollection<
    Center
  > = this.afFirestore.collection('centers');
  constructor(private afFirestore: AngularFirestore) {}

  createCenter(center: Center) {
    return this.centerCollection.add(center);
  }
}
