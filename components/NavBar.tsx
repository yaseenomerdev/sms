import Link from "next/link";
import React from "react";
import { useUser } from "context/userContext";
import LogOut from "./LogOut";

export default function NavBar() {
  const { loading: loadingUser, user } = useUser();
  return (
    <nav className="flex p-5 bg-[#f4f8f9] gap-4">
      <div className="flex gap-4">
        <Link href="/">
          <a href="#">
            <img
              className="hover:scale-105 duration-500"
              src="icons/alpha.png"
              width="30"
              alt="alpha"
              style={{ display: "inline-block" }}
            />
          </a>
        </Link>
        <Link href="/">
          <a href="#">Home</a>
        </Link>

        <Link href="/result">
          <a href="#">Result</a>
        </Link>

        <Link href="/users">
          <a href="#">Users</a>
        </Link>
      </div>
      <div className="flex gap-4  ml-auto">
        {!user && (
          <Link href="signup">
            <a href="#">Signup</a>
          </Link>
        )}

        {!user && (
          <Link href="login">
            <a href="#">Login</a>
          </Link>
        )}

        {user && (
          <a href="#">
            <LogOut />
          </a>
        )}
      </div>
    </nav>
  );
}
