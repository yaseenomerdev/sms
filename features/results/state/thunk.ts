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
  limit,
  orderBy,
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
        where("archive", "==", false),
        orderBy("createdAt", "desc"),
        limit(20)
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
 * @param {string | string[]} file
 */
export const deleteResult = createAsyncThunk(
  "result/deleteResult",
  async ({ id, file }: { id: string; file: string | string[] }) => {
    try {
      await deleteDoc(doc(firestore, "results", id));
      deleteFileFromStorage(file);
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
          archivedAt: Date.now(),
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
  if (snap.exists()) {
    return { id, ...snap.data() } as Result;
  }
  return null;
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
      if (!phoneNumber || !name) throw new Error("No phone number or name");
      const response = await sendSmsToUser(phoneNumber, message);
      if (response.isSend) {
        markResultAsSent(id);
        return { id, isSend: true };
      } else {
        throw new Error("Error sending sms");
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
);

const sendSmsToUser = async (
  phone: string,
  message: string
): Promise<{
  isSend: boolean;
}> => {
  const response = await fetch(
    "https://sms-service-kx9g.onrender.com/send-sms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, message }),
    }
  );
  return response.json();
};

const markResultAsSent = (id: string) => {
  setDoc(
    doc(firestore, "results", id),
    {
      sentForClient: true,
      sentForClientAt: Date.now(),
    },
    { merge: true }
  );
};
