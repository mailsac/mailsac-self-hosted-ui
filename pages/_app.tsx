import React, { ReactElement } from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import Layout from "../components/Layout";

import "../styles/app.scss";
import { AppBar, Button, Text } from "react-md";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Layout>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
      </Head>
      <Component {...pageProps} />
      <footer>
        <AppBar
          fixed
          fixedPosition="bottom"
          theme="default"
          style={{ textAlign: "center" }}
        >
          <Button><a href="https://mailsac.com">Temporary Email by Mailsac</a></Button>
        </AppBar>
      </footer>
    </Layout>
  );
}
