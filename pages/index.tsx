import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "context/userContext";
import Link from "next/link";
import AuthGuard from "components/AuthGuard";

const Home = () => {
  const { user, loading: loadingUser } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
    }
    // You also have your firebase app initialized
  }, [loadingUser, user]);

  if (loadingUser) return <p>loading ...</p>;

  return (
    <div>
      <Head>
        <title>الزرقاء لطب العيون</title>
        <meta name="description" content="الزرقاء لطب العيون" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center mt-5 gap-4">
        {/* <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-sm"></div>

          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-sm"></div>

          <div className="absolute left-20 top-5 -bottom-8 w-72 h-72 bg-[#22cc99] rounded-full mix-blend-multiply filter blur-sm"></div>
        </div> */}

        <p className="font-bold text-3xl text-primary">Alzarga SMS System</p>
        <div>
          <img src="/icons/logo.png" alt="logo" className="w-72" />
        </div>

        {user && (
          <p className="text-primary text-2xl font-bold">
            {user?.displayName} wlcome to alzarga
          </p>
        )}
        {!user && <AuthGuard />}
      </main>
    </div>
  );
};

export default Home;
