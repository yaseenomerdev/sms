import React from "react";

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <span
      className={`text-white h-5 w-5 border-r  border-b rounded-full  mr-2  animate-spin ${
        loading ? "flex" : "hidden"
      }`}
    ></span>
  );
}
