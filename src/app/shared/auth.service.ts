import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  isSignedIn: boolean;

  constructor(
    private afFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.isSignedIn = true;

          return this.afFirestore.doc<User>('users/' + user.uid).valueChanges();
          /*return this.afFirestore
            .doc<User>('users/' + user.uid)
            .snapshotChanges()
            .pipe(
              map(a => {
                const data = a.payload.data() as User;
                data.uid = a.payload.id;
                return data;
              })
            );*/
        } else {
          return of(null);
        }
      })
    );
  }

  async signInUsingEmail(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    return this.updateUserData(credential.user);
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afFirestore.doc<User>(
      'users/' + user.uid
    );

    const data = {
      uid: user.uid,
      email: user.email
    };

    return userRef.set(data, { merge: true });
  }

  saveUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afFirestore.doc<User>(
      'users/' + user.uid
    );

    return userRef.set(user, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(res => {
      this.router.navigateByUrl('/home');
    });
  }

  async createAccount(user: User, pass: string, centerID: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      pass
    );
    user.uid = credential.user.uid;
    return this.saveUserData(user).then(res => {
      return this.afFirestore
        .doc('centers/' + centerID + '/admins/' + user.uid)
        .set(user);
    });
  }
}
