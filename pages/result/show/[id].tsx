import React, { Context } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdClose, MdOutlineDescription } from "react-icons/md";
import { BiArchive } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { CiRead } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { getResultById, Result } from "features/results/state";
import AuthGuard from "components/AuthGuard";
import { useUser } from "context/userContext";
import ShowFile from "components/ShowFile";
import { getFileType } from "utils/extention.util";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const result = await getResultById(id);
  return {
    props: { result },
  };
}

function ResultDetails({ result }: { result: Result | null }) {
  const { user } = useUser();

  if (!result) {
    return <div>Result not found</div>;
  }

  if (!user) return <AuthGuard />;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2  bg-secondary p-6 gap-4">
      {/*
          <div>
            <img src={result?.file || getRandomImage} width="200" />
          </div>
       */}

      <div>
        {/* <object
          data={result?.file}
          type="application/pdf"
          width="100%"
          height="100%"
        /> */}

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
      </div>

      <div>
        <div className="flex gap-4">
          <HiOutlineUser className=" text-gray-500" />
          <span className="font-bold">Patient name:</span>
          <span>{result?.name}</span>
        </div>

        <div className="flex gap-4">
          <BsTelephone className=" text-gray-500" />
          <span className="font-bold">Phone number:</span>
          <span>{result?.phoneNumber}</span>
        </div>

        <div className="flex my-4 gap-4">
          <MdOutlineDescription className="text-gray-500" />
          <p>{result?.description}</p>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <div className="flex gap-3 items-center">
            <BiTimeFive className="text-gray-500" />
            <span className="font-bold"> created At: </span>
            <span>{new Date(result.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex gap-3 items-center">
            <AiOutlineUser className="text-gray-500" />
            <span className="font-bold"> Created By: </span>
            <span>{result?.createdByName}</span>
          </div>

          <div className="flex gap-3 items-center"></div>
          <div className="flex gap-3 items-center">
            <BiArchive className="text-gray-500" />
            Archive:{" "}
            <CheckAndDate checked={result.archive} date={result?.archiveAt} />
          </div>

          <div className="flex gap-3 items-center">
            <IoIosSend className="text-gray-500" />
            Sent For Client:{" "}
            <CheckAndDate
              checked={result.sentForClient}
              date={result?.sentForClientAt}
            />
          </div>

          <div className="flex gap-3 items-center">
            <CiRead className="text-gray-500" />
            Read By Client:{" "}
            <CheckAndDate
              checked={result.readByClient}
              date={result?.readByClientAt}
            />
          </div>

          <a href={result?.file} download className="flex gap-3 items-center">
            <BsFileEarmarkPdf className="text-gray-500" />
            <span> Download File</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultDetails;

export const getRandomImage: string =
  "https://source.unsplash.com/random/200x200";

const CheckAndDate = ({
  checked,
  date,
}: {
  checked: boolean;
  date: number | null;
}) => {
  if (!checked) return <MdClose className="text-red-500" />;
  return (
    <div className="flex items-center gap-4">
      <GiCheckMark className="text-green-500" />{" "}
      <BiTimeFive className="text-gray-500" />
      {date && new Date(date).toLocaleString()}
    </div>
  );
};
