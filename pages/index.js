import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useEffect, useState } from "react";

export default function Home({ allPostsData }) {
  const [submit, setSubmit] = useState(false);
  const [customer, setCustomer] = useState("");

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
      <input
        type="text"
        placeholder="customer"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <button onClick={() => setSubmit(true)}>do</button>
      {submit && <Checkout id={customer} />}
    </Layout>
  );
}

function Checkout({ id }) {
  useEffect(() => {
    async function getCustomer() {
      const response = await fetch(`/api/stripe/customer?id=${id}`);
      return await response.json();
    }

    async function createCustomer() {
      const response = await fetch("/api/stripe/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }

    async function process() {
      try {
        const cx = await getCustomer();

        if (cx?.error) {
          const cx = await createCustomer();
          console.log("created: ", cx);
        }
      } catch (error) {}
    }

    process();
  }, [id]);

  return <div>hola</div>;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
