import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const incrementUsers = functions.firestore
  .document('')
  .onWrite((change, context) => {
    //WRITE THE FUNCTIONS MICO
  });
