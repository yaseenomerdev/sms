import { useUser } from "context/userContext";
import { uploadTask } from "fire/clientApp";
import { getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "store";
import {
  checkFileIsPdf,
  defultValueOnCreate,
  Result,
  saveResult,
} from "./state";
import { ImSpinner10 } from "react-icons/im";
import { AiOutlineCloudUpload } from "react-icons/ai";

let resultId = Date.now();

function ResultForm({ currentResult }: { currentResult?: Result }) {
  const [result, setResult] = React.useState({
    name: currentResult?.name || "",
    description: currentResult?.description || "",
    phoneNumber: currentResult?.phoneNumber || "",
    file: currentResult?.file || "",
  });

  const dispatch = useAppDispatch();

  const { user } = useUser();

  const [progress, setProgress] = React.useState(0);

  const [uploading, setUploading] = React.useState("");

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
    };

    const id = currentResult?.id || resultId.toString();

    try {
      await dispatch(saveResult({ id, result: data }));
      resultId = Date.now();
      return push("/result");
    } catch (error: any) {
      alert(JSON.stringify(error));
    } finally {
      setResult({
        name: "",
        description: "",
        phoneNumber: "",
        file: "",
      });
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];

    if (!checkFileIsPdf(file)) return alert("File must be pdf");

    setUploading("uploading");

    const upload = uploadTask(file, `results/${currentResult?.id || resultId}`);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setUploading("");
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          setResult({ ...result, file: downloadURL });
        });
        setUploading("");
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-secondary justify-center gap-4 p-6"
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

      <div>
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
          {progress > 0 && progress < 100 && progress + "%"}
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
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || uploading === "uploading"}
          className="btn-primary"
        >
          {loading && <ImSpinner10 className="animate-spin" />}
          Save
        </button>
      </div>
    </form>
  );
}

export default ResultForm;
