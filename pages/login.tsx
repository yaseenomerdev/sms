import Head from "next/head";
import React from "react";
import LoginWIthEmailAmdPassword from "../components/LoginWIthEmailAmdPassword";


const Login = () => {
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
};

Login.layout = "L2";

export default Login;
