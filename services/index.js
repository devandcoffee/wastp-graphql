import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import config from '../config';
import User from '../models/User';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUri,
});

export default {
  authenticate: async (req) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return User.query().findOne('uid', decodedToken.uid);
      } catch (error) {
        return error;
      }
    }
  },
  signUp: async (newUser) => {
    try {
      const userRecord = await admin.auth().createUser(newUser);
      return userRecord;
    } catch (error) {
      return error;
    }
  },
};
