import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface IPostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
};

export default function PostPreview({ post }: IPostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [post.slug, router, session])
  
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
            className={`${styles.postContent} ${styles.previewContent}`} 
            dangerouslySetInnerHTML={{__html: post.content}} 
          />
          <div className={styles.continueReading}>
            Wanna continue reading? 
            <Link href={"/"}>Subscribe now 🤗</Link>
          </div>
        </article>
      </main>
    </>
  )
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async ({ params}) => {
  const slug = params!.slug;

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content:  prismicH.asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutos
  }
};