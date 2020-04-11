import * as firebase from 'firebase/app';
import 'firebase/database';

import {
  API_KEY,
  PROJECT_ID,
  MESSAGING_SENDER_ID,
  AUTH_DOMAIN, APP_ID, DATABASE_URL, STORAGE_BUCKET
} from './config';


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
