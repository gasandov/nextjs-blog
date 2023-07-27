import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useEffect, useState } from "react";
import { set } from "date-fns";

export default function Home({ allPostsData }) {
  const [cx, setCx] = useState({});
  const [value, setValue] = useState("");
  const [submit, setSubmit] = useState(false);

  const get = async () => {
    const response = await fetch(`/api/stripe/customer?id=${value}`);
    const customer = await response.json();
    console.log("returned: ", customer);
    setCx(customer);
  };

  const create = async () => {
    const response = await fetch("/api/stripe/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const customer = await response.json();
    console.log("created: ", customer);
    setCx(customer);
  };

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
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={get}>get</button>
      <button onClick={create}>create</button>
      <button
        onClick={() => {
          setCx("");
          setValue("");
          setSubmit(false);
        }}
      >
        reset
      </button>
      <div>{JSON.stringify(cx)}</div>
    </Layout>
  );
}

function Checkout({ id }) {
  const [cx, setCx] = useState({});

  const get = async () => {
    const response = await fetch(`/api/stripe/customer?id=${id}`);
    const customer = await response.json();
    console.log("returned: ", customer);
    setCx(customer);
  };

  const create = async () => {
    const response = await fetch("/api/stripe/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const customer = await response.json();
    console.log("created: ", customer);
    setCx(customer);
  };

  return <div>{JSON.stringify(cx)}</div>;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
