import React from "react";
import { auth } from "../fire/clientApp";
import { signOut } from "firebase/auth";

export default function LogOut() {
  return (
    <div>
      <a href="#" onClick={() => signOut(auth)}>
        Logout
      </a>
    </div>
  );
}
