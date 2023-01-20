import { uploadTask } from "fire/clientApp";
import { UploadTask } from "firebase/storage";

export interface HttpRequestOptions {
  method?: string;
  body?: any;
}

export const httpClient = async (url: string, options?: HttpRequestOptions) => {
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  });
  const data = await response.json();

  return data;
};



// const handleChange = (files: FileList) => {
//   // const file: File = (e.target.files as FileList)[0];

//   // if (!checkFileIsPdf(file)) return alert("File must be pdf");

//  //  setUploading("uploading");

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
