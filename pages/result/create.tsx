import React from "react";
import ResultForm from "components/results/ResultForm";

function CreateRsult() {
  return (
    <div className="flex flex-col justify-center m-5">
      <h1>Create Result</h1>
      <div>
        <ResultForm />
      </div>
    </div>
  );
}

export default CreateRsult;
