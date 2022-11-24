import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../context/userContext";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NavBar />
      <div className="m-5">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
