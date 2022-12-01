import Head from "next/head";
import { useUser } from "context/userContext";
import AuthGuard from "components/AuthGuard";
import Link from "next/link";
import { FaClipboardList, FaUsers } from "react-icons/fa";

const Home = () => {
  const { user, loading: loadingUser } = useUser();

  if (!user) return <AuthGuard />;
  return (
    <div>
      <Head>
        <title>مركز الزرقاء التخصصي لطب العيون</title>
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
        <div className="flex items-center justify-center gap-4">
          <Link href="/result">
            <div
              className="flex justify-center items-center p-6
            border border-primary  cursor-pointer text-primary
            hover:bg-primary hover:text-white duration-300 gap-2
            "
            >
              <FaClipboardList className="w-10 h-10 " />
              Results
            </div>
          </Link>
          <Link href="/users">
            <div
              className="flex justify-center items-center p-6
            border border-primary  cursor-pointer text-primary
            hover:bg-primary hover:text-white duration-300 gap-2
            "
            >
              <FaUsers className="w-10 h-10 " />
              Users
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

Home.layout = "L2";

export default Home;
