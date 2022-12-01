import { FirebaseError } from "fire/error";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { auth } from "../fire/clientApp";
import { SiMinutemailer } from "react-icons/si";
import { AiOutlineLogin } from "react-icons/ai";

export default function ForgotPasswordComponent() {
  const [email, setEmail] = React.useState("");

  const forgotPassord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);

      alert("send email verification");
    } catch (error: any) {
      return alert(FirebaseError.ParseError(error?.code));
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-4 flex-col bg-[#f4f8f9] p-5 rounded-[20px] outline-2 outline-offset-8 outline-dashed outline-[#f4f8f9]">
        <div className="flex justify-center">
          <img src="icons/logo.png" width="200" />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button className="btn-primary" onClick={forgotPassord}>
            <SiMinutemailer className="mr-2" />
            send verification email
          </button>
        </div>

        <div className="flex justify-center">
          <Link href="/login">
            <a className="text-primary flex">
              <AiOutlineLogin className="mr-2" />
              Back to login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
