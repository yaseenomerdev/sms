import { useUser } from "context/userContext";
import { addResult, deleteResult, getResults, Result } from "fire/clientApp";
import Link from "next/link";
import React from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

function ResultList() {
  const [results, setResults] = React.useState<Result[]>([]);

  const { user } = useUser();

  const [arrcive, setArrcive] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getResults();
        setResults(data);
      } catch (error) {}
    };

    getData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteResult(id);
      const newResults = results.filter((result: any) => result.id !== id);
      setResults(newResults);
    } catch (error) {}
  };

  const handleArchive = async (id: string, archive: boolean) => {
    await addResult(id, {
      archive,
      arrchiveBy: user?.uid || null,
      arrchiveByName: user?.displayName || null,
      arrchiveAt: Date.now(),
    });

    const data = await getResults();

    setResults(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/result/create">
          <button className="btn-primary">Create Result</button>
        </Link>
      </div>

      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>#</th>
              <td>Image</td>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Arrcive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: Result, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={result?.file} width="50" height={50} />
                </td>
                <td>{result?.name}</td>
                <td>{result?.phoneNumber}</td>
                <td>
                  {result?.archive ? (
                    <BsToggleOn
                      size={30}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleArchive(result.id, false)}
                    />
                  ) : (
                    <BsToggleOff
                      size={30}
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleArchive(result.id, true)}
                    />
                  )}
                </td>
                <td>
                  <div className="flex gap-4">
                    <Link href={`/result/show/${result.id}`}>
                      <button className="btn-secondary">details</button>
                    </Link>

                    <Link href={`/result/edit/${result.id}`}>
                      <button className="btn-secondary">Edit</button>
                    </Link>

                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(result.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultList;
