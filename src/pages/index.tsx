import Head from "next/head";
import Image from "next/image";

import style from "../styles/home.module.scss";

import girlCoding from "public/images/avatar.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={style.contentContainer}>
        <section className={style.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
        </section>
        <Image src={girlCoding} alt="Girl coding"/>
      </main>
    </>
  )
}
