import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

import * as path from 'path';

@Injectable()
export class FirebaseService {
  private logger = new Logger(FirebaseService.name);

  constructor() {
    // Initialize Firebase Admin SDK
    const serviceAccountPath = path.resolve(
      __dirname,
      '../../serviceAccountKey.json',
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
      databaseURL: 'https://nestdemo-9a319-default-rtdb.firebaseio.com/',
    });
  }

  async createRecord(collection: string, data: any) {
    const docRef = admin.firestore().collection(collection).doc();
    await docRef.set(data);
    return { id: docRef.id, ...data };
  }

  async readRecord(collection: string, id: string) {
    const docRef = admin.firestore().collection(collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('No document found!');
    }
    return { id: doc.id, ...doc.data() };
  }

  async updateRecord(collection: string, id: string, data: any) {
    const docRef = admin.firestore().collection(collection).doc(id);
    await docRef.update(data);
    return { message: 'Record updated successfully!' };
  }

  async deleteRecord(collection: string, id: string) {
    const docRef = admin.firestore().collection(collection).doc(id);
    await docRef.delete;
    return { Message: 'Record deleted successfully' };
  }
}
