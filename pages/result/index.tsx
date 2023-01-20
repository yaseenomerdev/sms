import { useUser } from "context/userContext";
import {
  archiveResult,
  deleteResult,
  fetchResults,
  Result,
  sendResultToSms,
} from "features/results/state";
import Link from "next/link";
import React from "react";
import { AppState, useAppDispatch, useAppSelector } from "store";
import { MdModeEdit, MdDelete, MdArchive } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/router";
import AuthGuard from "components/AuthGuard";
import { BsFileEarmarkPdf, BsPlus } from "react-icons/bs";
import Head from "next/head";
import Moment from "react-moment";
import ShowFile from "components/ShowFile";
import { getFileType } from "utils/extention.util";

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
      <Head>
        <title>Results</title>

        <meta name="description" content="Results" />
      </Head>
      <div>
        <Link href="/result/create">
          <button className="btn-primary">
            <BsPlus className="inline-block mr-1" size={30} />
            Add Result
          </button>
        </Link>
      </div>

      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>File</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>sms sent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: Result, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Moment fromNow>{result?.createdAt}</Moment>
                </td>
                <td>
                  <div className="flex gap-2">
                    {result?.files &&
                      result?.files?.map((file) => (
                        <ShowFile key={file} {...getFileType(file)} />
                      ))}
                    {result?.file && (
                      <a href={result?.file} target="_blank" rel="noreferrer">
                        <BsFileEarmarkPdf size={30} className="text-red-600" />
                      </a>
                    )}
                  </div>
                </td>
                <td>{result?.name}</td>
                <td>{result?.phoneNumber}</td>
                <td>
                  {!result?.sending &&
                    (result?.sentForClient ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    ))}

                  {result?.sending && (
                    <span className="text-yellow-600 animate-pulse">
                      Sending...
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex gap-4">
                    <Link href={`/result/show/${result.id}`}>
                      <button className="btn-secondary">
                        <IoMdEye />
                        Details
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        dispatch(
                          sendResultToSms({
                            id: result.id,
                            phoneNumber: result.phoneNumber,
                            name: result.name,
                          })
                        )
                      }
                      className="btn-secondary"
                    >
                      Re Send SMS
                    </button>

                    <button
                      className="btn-secondary"
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

                    <Link href={`/result/edit/${result.id}`}>
                      <button className="btn-secondary">
                        <MdModeEdit />
                      </button>
                    </Link>

                    <button
                      className="btn-secondary"
                      onClick={() =>
                        confirm(
                          "Are you sure you want to delete this result?"
                        ) &&
                        dispatch(
                          deleteResult({
                            id: result.id,
                            file: result?.file || result?.files || [],
                          })
                        )
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
