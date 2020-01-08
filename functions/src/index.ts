import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const incrementUsers = functions.firestore
  .document('invitations/{invitation}')
  .onWrite((change, context) => {
    //WRITE THE FUNCTIONS MICO
    const afterData = change.after.data();

    if (!afterData) {
      return;
    }

    if (afterData.status === 'approved') {
      if (afterData.invitationType === 1) {
        admin
          .firestore()
          .doc('centers/' + afterData.centerID)
          .update({ adminCount: FieldValue.increment(1) })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });
