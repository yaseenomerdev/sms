import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import UserProvider from "../context/userContext";
import NavBar from "../components/NavBar";
import { Provider } from "react-redux";
import store from "store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <NavBar />
        <div className="m-5">
          <Component {...pageProps} />
          <Analytics />
        </div>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
