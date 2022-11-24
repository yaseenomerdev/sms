import ResultForm from "components/results/ResultForm";
import { getResultById, Result } from "fire/clientApp";
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
      <h1>Create Result</h1>
      <div>
        <ResultForm currentResult={result} />
      </div>
    </div>
  );
}

export default Edit;
