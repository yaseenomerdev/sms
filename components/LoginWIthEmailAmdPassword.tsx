import { auth } from "../fire/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useRouter } from "next/router";
import LoginWithGoogle from "./LoginWithGoogle";
import Loading from "./Loading";
import Link from "next/link";
import { FirebaseError } from "fire/error";

export default function LoginWIthEmailAmdPassword() {
  const roter = useRouter();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) return alert("username and password require");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      roter.push("/");
    } catch (error: any) {
      return alert(FirebaseError.ParseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  gap-5 bg-secondary p-10 rounded-[20px] outline-2 outline-offset-8 outline-dashed outline-[#f4f8f9]">
          <div className="flex justify-center">
            <img src="icons/logo.png" width="200" />
          </div>
          <h1 className="text-primary  text-lg font-bold">Login</h1>

          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary">
            <Loading loading={loading} />
            Login{" "}
          </button>

          <div className="flex justify-center text-primary">
            <Link href="/forgotpassowrd">
              <a href="#">Forgot Passowrd</a>
            </Link>
          </div>

          {/* <LoginWithGoogle /> */}
        </div>
      </form>
    </div>
  );
}
