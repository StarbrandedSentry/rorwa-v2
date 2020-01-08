import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

const Firebase = [
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireAuthModule,
  AngularFireAuthGuardModule,
  AngularFireFunctionsModule
];

@NgModule({
  imports: [Firebase],
  exports: [Firebase]
})
export class FirebaseCollectionModule {}
