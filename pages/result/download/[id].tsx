import { getResultById, Result } from "features/results/state";
import { GetServerSidePropsContext } from "next";
import { AppContext } from "next/app";
import Head from "next/head";
import { BsFileEarmarkPdf } from "react-icons/bs";
import React from "react";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  context.preview = true;

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
      <div className="flex flex-col justify-center items-center text-primary font-medium text-xl gap-2 p-5">
        <img src="/icons/logo.png" width="200" />

        <p>{result?.name} عزيزي</p>
        <p>
          مرحبا بك في مركز الزرقاء التخصصي للعيون نتمنى لك الشفاء العاجل ادناه
          نتيجة فحصك
        </p>

        <a
          href={result?.file}
          download
          className="btn-primary flex items-center cursor-pointer gap-2"
        >
          <BsFileEarmarkPdf className="inline-block text-red-600" size={30} />
          تنزيل النتيجة
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
        <title>مركز الزرقاء التخصصي للعيون</title>

        <meta name="description" content="Download your result" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#1b1364" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="الزرقاء" />
        <meta name="description" content="نتيجة معامل مركز الزرقاء" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
      </Head>
      <div dir="rtl">{children}</div>
    </>
  );
};
