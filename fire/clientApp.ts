import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
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

export interface Result {
  id: string;
  name: string;
  description: string;
  phoneNumber: string;
  file: string;
  createdAt: number;
  createdBy: string;
  createdByName: string;
  updatedAt: number | null;
  sentForClient: boolean;
  sentForClientAt: number | null;
  readByClient: boolean;
  readByClientAt: number | null;
  archive: boolean;
  arrchiveAt: number | null;
  arrchiveBy: string | null;
  arrchiveByName: string | null;
}

export const defultValueOnCreate: Partial<Result> = {
  createdAt: Date.now(),
  updatedAt: null,
  sentForClient: false,
  sentForClientAt: null,
  readByClient: false,
  readByClientAt: null,
  archive: false,
  arrchiveAt: null,
  arrchiveBy: null,
};

export const getResults = async () => {
  const query = collection(firestore, "results");
  const snaps = await getDocs(query);
  const results = await convertSnapToResult(snaps);

  return results;
};

export const addResult = async (id: string, result: Partial<Result>) => {
  return setDoc(doc(firestore, "results", id), result, {
    merge: true,
  })
    .then(() => result)
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const deleteResult = async (id: string) => {
  return deleteDoc(doc(firestore, "results", id))
    .then(() => {
      deleteFileFromStorage(`results/${id}`);
      return id;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const convertSnapToResult = async (
  snap: QuerySnapshot
): Promise<Result[]> => {
  const results: Result[] = [];
  snap.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    } as Result);
  });
  return results;
};

export const deleteFileFromStorage = async (path: string) => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};

export const getResultById = async (id: string): Promise<Result | null> => {
  const docRef = doc(firestore, "results", id);
  const snap = await getDoc(docRef);
  if (!snap) return null;
  return {
    id: snap.id,
    ...snap.data(),
  } as Result;
};
