import React from "react";

function Guest({ children }: { children: React.ReactNode }) {
  return (
    // center the content in the middle of the screen with baground black
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
}

export default Guest;
