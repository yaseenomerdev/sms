import React from "react";
import { FileType } from "utils/extention.util";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiOutlineFileWord, AiFillFileExclamation } from "react-icons/ai";
import { BsFileEarmarkExcel, BsFileEarmarkImage } from "react-icons/bs";

function ShowFile({ url, type, download }: FileType & { download?: boolean }) {
  switch (type) {
    case "pdf": {
      return (
        <a
          href={url}
          download
          target="_blank"
          rel="noreferrer"
          className="flex"
        >
          <BsFileEarmarkPdf size={30} className="text-red-600" />
          {download && "تنزيل "}
        </a>
      );
    }
    case "doc": {
      return (
        <a
          href={url}
          target="_blank"
          download
          rel="noreferrer"
          className="flex"
        >
          <AiOutlineFileWord size={30} className="text-blue-600" />
          {download && "تنزيل "}
        </a>
      );
    }

    case "xls": {
      return (
        <a
          href={url}
          target="_blank"
          download
          rel="noreferrer"
          className="flex"
        >
          <BsFileEarmarkExcel size={30} className="text-green-600" />
          {download && "تنزيل "}
        </a>
      );
    }
    case "image": {
      return (
        <a
          href={url}
          target="_blank"
          download
          rel="noreferrer"
          className="flex"
        >
          <BsFileEarmarkImage size={30} className="text-cyan-600" />
          {download && "تنزيل "}
        </a>
      );
    }

    default: {
      return (
        <a
          href={url}
          target="_blank"
          download
          rel="noreferrer"
          className="flex"
        >
          <AiFillFileExclamation size={30} />
          {download && "تنزيل "}
        </a>
      );
    }
  }
}

export default ShowFile;
