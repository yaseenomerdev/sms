import { uploadTask } from "fire/clientApp";
import {
  getDownloadURL,
  StorageError,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { FiUploadCloud } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";

function MyDropzone({
  id,
  onSuccss,
}: {
  id: string;
  onSuccss: (urls: string[]) => void;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [uploaded, setUloaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileUrls, setFileUrls] = React.useState<string[]>([]);

  const onDrop = async (acceptedFiles: any) => {
    handleUploadFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
    });

  const handleUploadFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      setLoading(true);

      const file = files[i];
      const upload: UploadTask = uploadTask(file, `results/${id}`);

      upload.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(Math.floor(progress));
        },
        (error: StorageError) => {
          setError(error.message);
          setLoading(false);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setFileUrls([...fileUrls, downloadURL]);
          });
          setLoading(false);
        }
      );
    }

    onSuccss(fileUrls);
  };

  return (
    <div
      {...getRootProps()}
      style={{ cursor: "pointer" }}
      className="flex flex-col justify-center border border-dashed border-gray-400 items-center min-h-[100px] gap-2 p-2 bg-white rounded-lg"
    >
      <input {...getInputProps()} />

      {!loading && !error && (
        <div className="flex gap-1">
          <FiUploadCloud />
          <span>Select Files Or Dag & Drop</span>
        </div>
      )}

      <div className="flex flex-col">
        {fileUrls.map((f, x) => (
          <div className="flex gap-2">
            <BsCheckLg
              key={crypto.randomUUID() + x}
              className="text-green-600"
            />{" "}
            <span>{x + 1}</span>
          </div>
        ))}
      </div>

      {/* {error && (
        <Flex color="red" gap={2}>
          {error}

          <CloseIcon color="red" />
        </Flex>
      )} */}

      {loading && (
        <div className="flex gap-2">
          <span>{progress} %</span>
          <CgSpinner className="animate-spin" size={30} />
        </div>
      )}

      {/* {uploaded && <CheckIcon color="green" />} */}
    </div>
  );
}

export default MyDropzone;
