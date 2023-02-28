import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getPrismicClient } from "../services/prismic";
import * as prismicH from '@prismicio/helpers';
import Head from "next/head";

import styles from "./post.module.scss";

interface IPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
};

export default function Post({ post }: IPostProps) {
  return (
    <>
      <Head>
        <title>{post.title} ! ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent} 
            dangerouslySetInnerHTML={{__html: post.content}} 
          />
        </article>
      </main>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async ({req, res, params}) => {
  const session = await getServerSession(req, res, authOptions);
  const slug = params!.slug;

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content:  prismicH.asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  return {
    props: {
      post
    }
  }
};