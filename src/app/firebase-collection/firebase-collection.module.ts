import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const Firebase = [AngularFirestoreModule];

@NgModule({
  imports: [Firebase],
  exports: [Firebase]
})
export class FirebaseCollectionModule {}
