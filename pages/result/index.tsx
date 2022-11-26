import { useUser } from "context/userContext";
import {
  archiveResult,
  deleteResult,
  fetchResults,
  Result,
} from "features/results/state";
import Link from "next/link";
import React from "react";
import { AppState, useAppDispatch, useAppSelector } from "store";
import { MdModeEdit, MdDelete, MdArchive } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/router";
import AuthGuard from "components/AuthGuard";
import { BsFileEarmarkPdf } from "react-icons/bs";

function ResultList() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const { results } = useAppSelector((state: AppState) => state.result);

  React.useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  const router = useRouter();

  if (!user) return <AuthGuard />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/result/create">
          <button className="btn-primary">Add Result</button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: Result, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <a href={result?.file} target="_blank" rel="noreferrer">
                    <BsFileEarmarkPdf size={30} className="text-red-600" />
                  </a>
                </td>
                <td>{result?.name}</td>
                <td>{result?.phoneNumber}</td>
                <td>
                  <div className="flex gap-4">
                    <Link href={`/result/show/${result.id}`}>
                      <button>
                        <IoMdEye />
                        Details
                      </button>
                    </Link>

                    <Link href={`/result/edit/${result.id}`}>
                      <button>
                        <MdModeEdit />
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn-danger"
                      onClick={() =>
                        dispatch(
                          archiveResult({
                            id: result.id,
                            archive: true,
                            archiveBy: user?.uid,
                            archiveByName: user?.displayName,
                          })
                        )
                      }
                    >
                      <MdArchive />
                      archive
                    </button>

                    <button
                      className="btn-danger"
                      onClick={() =>
                        confirm(
                          "Are you sure you want to delete this result?"
                        ) && dispatch(deleteResult(result.id))
                      }
                    >
                      <MdDelete />
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
