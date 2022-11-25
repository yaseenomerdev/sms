import { useUser } from "context/userContext";
import {
  addResult,
  defultValueOnCreate,
  Result,
  uploadTask,
} from "fire/clientApp";
import { getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";

let resultId = Date.now();

function ResultForm({ currentResult }: { currentResult?: Result }) {
  const [result, setResult] = React.useState({
    name: currentResult?.name || "",
    description: currentResult?.description || "",
    phoneNumber: currentResult?.phoneNumber || "",
    file: currentResult?.file || "",
  });

  const { loading: loadingUser, user } = useUser();

  const [progress, setProgress] = React.useState(0);

  const [uploading, setUploading] = React.useState("");

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Partial<Result> = {
      createdBy: user?.uid,
      createdByName: user?.displayName || "",
      ...defultValueOnCreate,
      ...result,
    };

    const id = currentResult?.id || resultId.toString();

    try {
      await addResult(id, data);
      resultId = Date.now();

      push("/result");
    } catch (error) {
    } finally {
      setResult({
        name: "",
        description: "",
        phoneNumber: "",
        file: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading("Uploading");
    const file: File = (e.target.files as FileList)[0];
    console.log(resultId);

    const upload = uploadTask(file, `results/${resultId}`);

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
        <input
          type="text"
          name="description"
          id="description"
          value={result.description}
          onChange={(e) =>
            setResult({ ...result, description: e.target.value })
          }
        />
      </div>

      <div>
        <label className="btn-secondary">
          {uploading === "Uploading" && "Uploading..."}
          {progress === 0 && "Upload file"}
          {progress > 0 && progress < 100 && progress + "%"}
          {progress === 100 && (
            <span className="text-primary">Uploaded successfully</span>
          )}
          <input type="file" name="file" hidden onChange={handleChange} />
        </label>
      </div>

      <div>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default ResultForm;
