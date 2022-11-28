import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "context/userContext";

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

      <main className="flex items-center justify-center mt-5 gap-4">
        {/* <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-sm"></div>

          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-sm"></div>

          <div className="absolute left-20 top-5 -bottom-8 w-72 h-72 bg-[#22cc99] rounded-full mix-blend-multiply filter blur-sm"></div>
        </div> */}

        {user && <p>wlcome to alzarga {user?.displayName}</p>}
        {!user && (
          <div className="flex flex-col justify-center items-center gap-2">
            <p> Not logged in plase login to continue</p>
            <a className="btn-primary" href="/login">
              login
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
