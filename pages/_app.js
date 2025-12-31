import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
