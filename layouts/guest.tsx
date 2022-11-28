import React from "react";

function Guest({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-md">{children}</div>
      </div>
    </div>
  );
}

export default Guest;
