import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../fire/clientApp";
import { useRouter } from "next/router";

export default function LoginWithGoogle() {
  const router = useRouter();
  const login = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
      router.push("/");
    });
  };

  return (
    <button onClick={login}>
      <img src="icons/google.png" width={20} className="mx-1" />
      Login with google{" "}
    </button>
  );
}
