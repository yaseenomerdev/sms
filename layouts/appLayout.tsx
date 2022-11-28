import NavBar from "components/NavBar";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-md shadow-md">{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
