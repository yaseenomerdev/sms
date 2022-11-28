import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertSnaps, deleteFileFromStorage, firestore } from "fire/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Result } from "./model";

/**
 * Get all results
 * @returns {Promise<Result[]>}
 */
export const fetchResults = createAsyncThunk(
  "result/fetchResults",
  async () => {
    try {
      const q = query(
        collection(firestore, "results"),
        where("archive", "==", false)
      );
      const snaps = await getDocs(q);
      return convertSnaps<Result>(snaps);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

/**
 * Add a result
 * @param {string} id
 * @param {Partial<Result>} result
 */
export const saveResult = createAsyncThunk(
  "result/saveResult",
  async ({ id, result }: { id: string; result: Partial<Result> }) => {
    try {
      await setDoc(doc(firestore, "results", id), result, { merge: true });
      return { id, ...result } as Result;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

/**
 * Delete a result
 * @param {string} id
 */
export const deleteResult = createAsyncThunk(
  "result/deleteResult",
  async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "results", id));
      deleteFileFromStorage(`results/${id}`);
      return id;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

/**
 * Path: features\results\state\slice.ts
 * Compare this snippet from store\index.ts:
 */
export const archiveResult = createAsyncThunk(
  "result/archiveResult",
  async ({
    id,
    archive,
    archiveBy,
    archiveByName,
  }: {
    id: string;
    archive: boolean;
    archiveBy?: string;
    archiveByName?: string | null;
  }): Promise<{ id: string; archive: boolean }> => {
    try {
      await setDoc(
        doc(firestore, "results", id),
        {
          archive,
          archiveBy: archiveBy || null,
          archiveByName: archiveByName || null,
          archivedAt: new Date(),
        },
        { merge: true }
      );
      return { id, archive };
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

export const getResultById = async (id: string): Promise<Result | null> => {
  const docRef = doc(firestore, "results", id);
  const snap = await getDoc(docRef);
  if (!snap) return null;
  return {
    id: snap.id,
    ...snap.data(),
  } as Result;
};

export const sendResultToSms = createAsyncThunk(
  "result/sendSms",
  async ({
    id,
    phoneNumber,
    name,
  }: {
    id: string;
    phoneNumber: string | null | undefined;
    name: string | null | undefined;
  }) => {
    const fileUrl = `https://sms-ruddy.vercel.app/result/download/${id}`;
    const message = `مرحبا ${name}، تم إرسال نتيجة الفحص الخاصة بكم، يمكنكم الاطلاع عليها من خلال الرابط التالي: ${fileUrl}`;
    try {
      if (!phoneNumber || !name) return;
      const isSend = await sendSmsToUser(phoneNumber, message);
      return id;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

const sendSmsToUser = async (
  phone: string,
  message: string
): Promise<boolean> => {
  const response = await fetch(smsUrlWithParams(phone, message));

  let isSend = false;
  if (response.ok) {
    isSend = true;
  }
  return isSend;
};

const smsUrlWithParams = (
  phone: string,
  message: string,
  user = "Alzarga",
  pwd = "80098"
): string => {
  return `http://212.0.129.229/bulksms/webacc.aspx?user=${user}&pwd=${pwd}&smstext=${message}&Sender=Alzarga&Nums=${phone}`;
};
