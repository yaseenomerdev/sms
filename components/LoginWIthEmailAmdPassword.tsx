import { auth } from "../fire/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useRouter } from "next/router";
import LoginWithGoogle from "./LoginWithGoogle";
import Loading from "./Loading";
import Link from "next/link";

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  gap-5 bg-[#f4f8f9] p-10 rounded-[20px]">
          <div className="flex justify-center">
            <img src="icons/alpha.png" width="70" />
          </div>
          <h1 className="text-[#20cc99]  text-lg font-bold">Login</h1>

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

          <button type="submit" className="bg-[#20cc99] hover:bg-green-800">
            <Loading loading={loading} />
            Login{" "}
          </button>

          <div className="flex justify-center text-[#20cc99]">
            <Link href="/forgotpassowrd">
              <a href="#">Forgot Passowrd</a>
            </Link>
          </div>

          <LoginWithGoogle />
        </div>
      </form>
    </div>
  );
}
