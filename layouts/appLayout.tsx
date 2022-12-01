import NavBar from "components/NavBar";
import { useUser } from "context/userContext";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  return (
    <div>
      {user && <NavBar />}
      <div className="flex justify-center items-center">
        <div className="bg-white p-6 rounded-md">{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
