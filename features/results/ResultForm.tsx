import { useUser } from "context/userContext";
import { deleteFileFromStorage, uploadTask } from "fire/clientApp";
import {
  getDownloadURL,
  StorageError,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "store";
import {
  checkFileIsPdf,
  defultValueOnCreate,
  Result,
  saveResult,
  sendResultToSms,
} from "./state";
import { ImSpinner10 } from "react-icons/im";
import { AiOutlineSave } from "react-icons/ai";
import FileInput from "components/FileInput";
import { MdOutlineDelete } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

let resultId = Date.now();

function ResultForm({ currentResult }: { currentResult?: Result }) {
  const [result, setResult] = useState({
    name: currentResult?.name || "",
    description: currentResult?.description || "",
    phoneNumber: currentResult?.phoneNumber || "",
    files: currentResult?.files || [],
  });

  const [files, setFiles] = useState<
    {
      fileUrl: string;
      fileName: string;
    }[]
  >([]);

  const [fileUrlDelete, setFileUrlDelete] = useState<string>("");

  const deleteFile = async (fileUrl: string) => {
    setFileUrlDelete(fileUrl);
    await deleteFileFromStorage(fileUrl);
    const filterFiles = files.filter((file) => file.fileUrl != fileUrl);
    setFileUrlDelete("");
    setFiles(filterFiles);
  };

  const dispatch = useAppDispatch();

  const { user } = useUser();

  const [loading, setLoading] = React.useState(false);

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const data: Partial<Result> = {
      createdBy: user?.uid || null,
      createdByName: user?.displayName || null,
      ...defultValueOnCreate,
      ...result,
      files: currentResult?.files || files.map((file) => file.fileUrl),
      phoneNumber:
        currentResult?.phoneNumber ||
        checkIsFristNumberIsZero(result.phoneNumber),
    };

    const id = currentResult?.id || resultId.toString();

    const { phoneNumber, name, file } = data;

    if (!phoneNumber || !name || files.length < 0) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      await dispatch(saveResult({ id, result: data }));

      if (!currentResult) {
        dispatch(
          sendResultToSms({
            id,
            phoneNumber,
            name,
          })
        );
      }

      resultId = Date.now();
      return push("/result");
    } catch (error: any) {
      alert("Something went wrong");
    } finally {
      setResult({
        name: "",
        description: "",
        phoneNumber: "",
        files: [],
      });
      setLoading(false);
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: File = (e.target.files as FileList)[0];

  //   if (!checkFileIsPdf(file)) return alert("File must be pdf");

  //   setUploading("uploading");

  //   const upload: UploadTask = uploadTask(
  //     file,
  //     `results/${currentResult?.id || resultId}`
  //   );

  //   upload.on(
  //     "state_changed",
  //     (snapshot: UploadTaskSnapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //       setProgress(progress);
  //     },
  //     (error: StorageError) => {
  //       console.log(error);
  //       setUploading("");
  //     },
  //     () => {
  //       getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
  //         setResult({ ...result, file: downloadURL });
  //       });
  //       setUploading("");
  //     }
  //   );
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-secondary justify-center gap-4 p-6 rounded-lg"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={result.name}
          onChange={(e) => setResult({ ...result, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="name">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="name"
          value={result.phoneNumber}
          placeholder="Ex: 0912345678 without +249 or 00249"
          onChange={(e) =>
            setResult({ ...result, phoneNumber: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          value={result.description}
          onChange={(e) =>
            setResult({ ...result, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* <div>
        <label
          htmlFor="file"
          className="flex btn-secondary items-center gap-2"
          style={{
            cursor: "pointer",
          }}
        >
          <AiOutlineCloudUpload className="animate-bounce " />
          {uploading === "uploading" && "Uploading..."}
          {progress === 0 && "Upload file (pdf only) "}
          {progress > 0 && progress < 100 && progress.toFixed(2) + "%"}
          {progress === 100 && (
            <span className="text-primary">Uploaded successfully</span>
          )}
          <input
            type="file"
            accept="application/pdf"
            name="file"
            id="file"
            hidden
            onChange={handleChange}
          />
        </label>
      </div> */}

      <div>
        {files.length > 0 && (
          <table className="table-auto bg-white">
            <tbody>
              {files.map((file, x) => (
                <tr key={file.fileUrl}>
                  <td>{x + 1}</td>
                  <td>{file.fileName}</td>
                  <td>
                    {fileUrlDelete == file.fileUrl ? (
                      <VscLoading className="animate-spin" />
                    ) : (
                      <MdOutlineDelete
                        onClick={(e) => deleteFile(file.fileUrl)}
                        className="cursor-pointer hover:scale-105 duration-200"
                        size={25}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <FileInput
          id={currentResult?.id || resultId.toString()}
          onUploadSuccess={(fileUrl, fileName) =>
            setFiles([...files, { fileUrl, fileName }])
          }
        />
        {/* <MyDropzone
          id={currentResult?.id || resultId.toString()}
          onSuccss={onSuccss}
        /> */}
      </div>

      <div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading && <ImSpinner10 className="animate-spin" />}
          <AiOutlineSave className="mr-1" size={20} />
          Save
        </button>
      </div>
    </form>
  );
}

export default ResultForm;

const checkIsFristNumberIsZero = (phoneNumber: string): string => {
  const isZero = phoneNumber[0] === "0";
  if (isZero) {
    return "249" + phoneNumber.slice(1).replace(/\s/g, "");
  }
  return "249" + phoneNumber.replace(/\s/g, "");
};
