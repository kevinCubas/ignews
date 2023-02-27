import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>Create and learn NextJS App</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Mollitia, maxime non natus similique accusantium labore unde culpa quis iure.
              Error, velit iusto repudiandae quae assumenda tenetur distinctio ratione libero in!
            </p>
          </a>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>Create and learn NextJS App</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Mollitia, maxime non natus similique accusantium labore unde culpa quis iure.
              Error, velit iusto repudiandae quae assumenda tenetur distinctio ratione libero in!
            </p>
          </a>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>Create and learn NextJS App</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Mollitia, maxime non natus similique accusantium labore unde culpa quis iure.
              Error, velit iusto repudiandae quae assumenda tenetur distinctio ratione libero in!
            </p>
          </a>
        </div>
      </main>
    </>
  )
};