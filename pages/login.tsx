import Head from "next/head";
import React from "react";
import LoginWIthEmailAmdPassword from "../components/LoginWIthEmailAmdPassword";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <LoginWIthEmailAmdPassword />
      </main>
    </>
  );
}
