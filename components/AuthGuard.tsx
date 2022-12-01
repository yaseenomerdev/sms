import Link from "next/link";
import React from "react";
import { BiLogInCircle } from "react-icons/bi";

function AuthGuard() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-5 gap-4">
      <img src="/icons/logo.png" alt="logo" className="w-72" />
      <h1 className="text-2xl font-bold">You are not logged in</h1>
      <Link href="/login">
        <button className="btn-primary">
          <BiLogInCircle className="inline-block w-6 h-6 mr-2" />
          Go to login
        </button>
      </Link>
    </div>
  );
}

AuthGuard.layout = "L2";

export default AuthGuard;
