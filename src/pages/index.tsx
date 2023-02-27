import Head from "next/head";
import Image from "next/image";

import style from "../styles/home.module.scss";

import girlCoding from "public/images/avatar.svg";
import { SubscribeButton } from "@/components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "./services/stripe";

interface IHomeProps {
  product: {
    priceId: string,
    amount: string,
  }
}

export default function Home({ product }: IHomeProps) {
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
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={girlCoding} alt="Girl coding" priority/>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MfUQPCnZ0yaKoz45U10OjIl');
  

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount! / 100)),

  }

  return {
    props: {
      product
    }, 
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
