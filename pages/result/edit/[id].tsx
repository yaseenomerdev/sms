import ResultForm from "features/results/ResultForm";
import { getResultById, Result } from "features/results/state";
import React from "react";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const result = await getResultById(id);
  return {
    props: { result },
  };
}

function Edit({ result }: { result: Result | null }) {
  if (!result) {
    return <div>Result not found</div>;
  }
  return (
    <div className="flex flex-col justify-center m-5">
      <h1>Edit Result</h1>
      <div>
        <ResultForm currentResult={result} />
      </div>
    </div>
  );
}

export default Edit;
