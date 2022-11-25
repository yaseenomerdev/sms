import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { DocumentData, getFirestore, QuerySnapshot } from "firebase/firestore";
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";

export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  if (getApps().length <= 0) {
    const app = initializeApp(clientCredentials);
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined") {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ("measurementId" in clientCredentials) {
        getAnalytics();
      }
    }
    return app;
  }
};

export const auth = getAuth(createFirebaseApp());

export const storage = getStorage(createFirebaseApp());

export const firestore = getFirestore(createFirebaseApp());

export const uploadTask = (file: File, path: string): UploadTask => {
  const storageRef = ref(storage, path);
  return uploadBytesResumable(storageRef, file);
};

export function convertSnaps<T extends { id: string }>(
  snaps: QuerySnapshot<DocumentData>
): T[] {
  const data: T[] = [];
  snaps.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as T);
  });
  return data;
}

export const deleteFileFromStorage = async (path: string) => {
  if (path) {
    const storageRef = ref(storage, path);
    deleteObject(storageRef);
  }
};
