import { useUser } from "context/userContext";
import {
  archiveResult,
  deleteResult,
  fetchMoreResults,
  fetchResults,
  Result,
  sendResultToSms,
} from "features/results/state";
import Link from "next/link";
import React, { Fragment, useState } from "react";
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
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaSms, FaSpinner } from "react-icons/fa";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function ResultList() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const { results, loading } = useAppSelector(
    (state: AppState) => state.result
  );

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

      <div className="overflow-x-auto ">
        <table className="table-auto overflow-scroll w-full">
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
                  {/* <div className="flex gap-4">
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
                  </div> */}

                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center   px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50  ">
                        <SlOptionsVertical />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <Link href={`/result/show/${result.id}`}>
                                  <span className="flex items-center gap-2">
                                    <IoMdEye />
                                    Details
                                  </span>
                                </Link>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <span
                                  onClick={() =>
                                    dispatch(
                                      sendResultToSms({
                                        id: result.id,
                                        phoneNumber: result.phoneNumber,
                                        name: result.name,
                                      })
                                    )
                                  }
                                  className="flex gap-2"
                                >
                                  <FaSms />
                                  Re Send SMS
                                </span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <span
                                  className="flex items-center gap-2"
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
                                </span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                              >
                                <span
                                  className="flex items-center gap-2 text-red-600"
                                  onClick={() =>
                                    confirm(
                                      "Are you sure you want to delete this result?"
                                    ) &&
                                    dispatch(
                                      deleteResult({
                                        id: result.id,
                                        file:
                                          result?.file || result?.files || [],
                                      })
                                    )
                                  }
                                >
                                  <MdDelete />
                                  Delete
                                </span>
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 p-5">
          <button
            onClick={(e) =>
              dispatch(fetchMoreResults(results[results.length - 1]?.createdAt))
            }
          >
            {loading && <FaSpinner className="animate-spin" />}
            Load More Result
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultList;
