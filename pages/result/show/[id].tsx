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

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const result = await getResultById(id);
  return {
    props: { result },
  };
}

function ResultDetails({ result }: { result: Result | null }) {
  if (!result) {
    return <div>Result not found</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center bg-secondary p-6">
      {/* <div>
        <img src={result?.file || getRandomImage} width="200" />
      </div> */}
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
            <CheckAndDate checked={result.archive} date={result?.arrchiveAt} />
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
