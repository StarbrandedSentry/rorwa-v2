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
      } else if (afterData.invitationType === 2) {
        admin
          .firestore()
          .doc('centers/' + afterData.centerID)
          .update({ memberCount: FieldValue.increment(1) })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });

export const incrementResearchCount = functions.firestore
  .document('researches/{research}')
  .onWrite((change, context) => {
    //YEAH I WRITE FUNCTIONS HOW CAN YOU TELL
    const afterData = change.after.data();
    if (!afterData) {
      return;
    }

    admin
      .firestore()
      .doc('centers/' + afterData.centerID)
      .update({ researchCount: FieldValue.increment(1) })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
