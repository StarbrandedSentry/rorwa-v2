import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

const A_APP_ID = functions.config().algolia.app;
const A_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(A_APP_ID, A_ADMIN_KEY);
const researchIndex = client.initIndex('researches');

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

export const decrementResearchCount = functions.firestore
  .document('researches/{research}')
  .onDelete(snapshot => {
    const data = snapshot.data();
    if (!data) {
      return;
    }

    admin
      .firestore()
      .doc('centers/' + data.centerID)
      .update({ researchCount: FieldValue.increment(-1) })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });

export const addResearchToIndex = functions.firestore
  .document('researches/{research}')
  .onCreate(snapshot => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return researchIndex.addObject({ ...data, objectID });
  });

export const updateResearchIndex = functions.firestore
  .document('researches/{research}')
  .onUpdate(change => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return researchIndex.saveObject({ ...newData, objectID });
  });

export const deleteResearchIndex = functions.firestore
  .document('researches/{research}')
  .onDelete(snapshot => {
    researchIndex
      .deleteObject(snapshot.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
