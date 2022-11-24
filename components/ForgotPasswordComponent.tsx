import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../fire/clientApp";

export default function ForgotPasswordComponent() {
  const [email, setEmail] = React.useState("");

  const forgotPassord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);

      alert("send email verification");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-2 flex-col bg-[#f4f8f9] p-5 rounded-lg">
        <div className="flex justify-center">
          <img src="icons/alpha.png" width="70" />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button className="bg-[#20cc99]" onClick={forgotPassord}>
            send verification email
          </button>
        </div>
      </div>
    </div>
  );
}
