import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import AppLayout from "layouts/appLayout";
import Guest from "layouts/guest";

import UserProvider from "../context/userContext";
import NavBar from "../components/NavBar";
import { Provider } from "react-redux";
import store from "store";

const layouts: any = {
  L1: AppLayout,
  L2: Guest,
};

function MyApp({ Component, pageProps }: any) {
  const Layout = layouts[Component.layout || "L1"];
  return (
    <Provider store={store}>
      <UserProvider>
        <Layout>
          <NextNProgress
            color="#1b1364"
            startPosition={0.3}
            stopDelayMs={200}
            height={7}
            showOnShallow={true}
          />

          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
