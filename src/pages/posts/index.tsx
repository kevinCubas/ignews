import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../services/prismic";
import * as prismicH from '@prismicio/helpers';

import styles from "./styles.module.scss";

type PostType = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface IPostsProps {
  posts: PostType[]
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => {
              return (
                <a href="" key={post.slug}>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              )
            })
          }
        </div>
      </main>
    </>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getByType("post", {
    pageSize: 100,
  });

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt: post.data.content.find((content: { type: string; }) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: { posts },
  };
}