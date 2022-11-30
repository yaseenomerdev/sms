import { useRouter } from "next/router";
import React from "react";
import { httpClient } from "../utils/api.util";
import Loading from "./Loading";
import LoginWithGoogle from "./LoginWithGoogle";

export default function Register() {
  const [form, setForm] = React.useState({
    email: "",
    displayName: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, displayName, password } = form;

    if (!email || !displayName || !password) return;

    const body = { email, displayName, password };

    setLoading(true);

    try {
      const user = await httpClient("/api/signup", {
        method: "POST",
        body,
      });

      push("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center mt-10  ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  gap-5 bg-secondary p-10 rounded-[20px] outline-2 outline-offset-8 outline-dashed outline-[#f4f8f9]">
          <div className="flex justify-center">
            <img src="icons/logo.png" width="200" />
          </div>
          <h1 className="text-primary font-extrabold text-xl">Register</h1>
          <div>
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
            />
          </div>
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
            Register
          </button>

          {/* <LoginWithGoogle /> */}
        </div>
      </form>
    </div>
  );
}
