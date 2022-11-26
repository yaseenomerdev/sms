import Link from "next/link";
import React from "react";

function AuthGuard() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">You are not logged in</h1>
      <Link href="/login">
        <a className="text-blue-500">Login</a>
      </Link>
    </div>
  );
}

export default AuthGuard;
