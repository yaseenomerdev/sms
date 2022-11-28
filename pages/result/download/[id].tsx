import { getResultById, Result } from "features/results/state";
import Head from "next/head";
import React from "react";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const result = await getResultById(id);
  return {
    props: { result },
  };
}

function Download({ result }: { result: Result | null }) {
  if (!result) {
    return <Layout>Result not found</Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <img src="/icons/alpha.png" width="200" />

        <p>{result?.name} عزيزي</p>
        <p>
          مرحبا بك في معامل الزرقاء لطب العيون نتمنى لك الشفاء العاجل ادناه
          نتيجة فحصك
        </p>

        <a
          href={result?.file}
          download
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          تحميل النتيجة
        </a>
      </div>
    </Layout>
  );
}
Download.layout = "L2";
export default Download;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>الزرقاء لطب العيون</title>

        <meta name="description" content="Download your result" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="الزرقاء" />
        <meta name="description" content="نتيجة معامل الزرقاء لطب العيون" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
      </Head>
      <div>{children}</div>
    </>
  );
};