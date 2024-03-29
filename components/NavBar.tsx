import Link from "next/link";
import React from "react";
import { useUser } from "context/userContext";
import LogOut from "./LogOut";

export default function NavBar() {
  const { loading: loadingUser, user } = useUser();
  return (
    <nav className="flex p-5 bg-secondary gap-4">
      <div className="flex gap-4">
        <Link href="/">
          <img
            className="hover:scale-105 duration-500"
            src="icons/logoo.png"
            width="50"
            alt="alpha"
            style={{ display: "inline-block" }}
          />
        </Link>

        <Link href="/">Home</Link>

        <Link href="/result">Result</Link>

        <Link href="/users">Users</Link>
      </div>
      <div className="flex gap-4  ml-auto">
        {/* {user && (
          <Link href="signup">
            <a href="signup">Register</a>
          </Link>
        )} */}

        {!user && <Link href="/login">Login</Link>}

        {user && (
          <span className="cursor-pointer">
            <LogOut />
          </span>
        )}
      </div>
    </nav>
  );
}
