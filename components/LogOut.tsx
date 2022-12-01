import React from "react";
import { auth } from "../fire/clientApp";
import { signOut } from "firebase/auth";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function LogOut() {
  return (
    <div>
      <a
        href="#"
        onClick={() => signOut(auth)}
        className="flex justify-center items-center gap-2"
      >
        <RiLogoutCircleLine className="w-6 h-6" />
        Logout
      </a>
    </div>
  );
}
