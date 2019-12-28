import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Invitation, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afFirestore: AngularFirestore) {}

  addAdmin(centerID: string, userID: string, user: User) {
    return this.afFirestore
      .doc('centers/' + centerID + '/admins/' + userID)
      .set(user);
  }

  createInvitation(invitation: Invitation) {
    return this.afFirestore.collection('invitations').add(invitation);
  }
}
