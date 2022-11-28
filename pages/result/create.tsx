import React from "react";
import ResultForm from "features/results/ResultForm";
import AuthGuard from "components/AuthGuard";
import { useUser } from "context/userContext";

function CreateRsult() {
  const { user } = useUser();

  if (!user) return <AuthGuard />;
  return (
    <div className="flex flex-col justify-center m-5  gap-4">
      <h1 className="text-primary font-extrabold text-3xl">Add Result</h1>
      <div>
        <ResultForm />
      </div>
    </div>
  );
}

export default CreateRsult;
