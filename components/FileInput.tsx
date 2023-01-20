import { uploadTask } from "fire/clientApp";
import {
  getDownloadURL,
  StorageError,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

function FileInput({
  id,
  onUploadSuccess,
}: {
  id: string;
  onUploadSuccess: (fileUrl: string, fileName: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: any) => {
    const file: File = e.target.files[0];

    setLoading(true);

    const upload: UploadTask = uploadTask(file, `results/${id}-${file.name}`);

    upload.on(
      "state_changed",
      (snap: UploadTaskSnapshot) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;

        setProgress(Math.floor(progress));
      },
      (error: StorageError) => {
        setError(error.message);
        setLoading(false);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          onUploadSuccess(downloadURL, file.name);
          setError(null);
          setLoading(false);
        });
      }
    );
  };

  return (
    <label className="flex justify-center items-center rounded-lg gap-2 cursor-pointer bg-white p-3">
      {loading ? (
        <VscLoading className="animate-spin" />
      ) : (
        <>
          <FaCloudUploadAlt />
          <span>upload File</span>
        </>
      )}

      <input hidden type="file" onChange={handleFileUpload} />
    </label>
  );
}

export default FileInput;
