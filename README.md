# IgNews
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tools:
- [Sass](https://sass-lang.com/) - styles with SCSS
- [Stripe](https://stripe.com/br) - payments
- [Github](https://github.com/) - authentication + OAuth
- [NextAuth](https://authjs.dev/) - Authentication NextJS
- [faunaDB](https://fauna.com/) - database
- [Axios](https://axios-http.com/ptbr/docs/intro) -  promise-based HTTP Client
- [Prismic CMS](https://prismic.io/)- CMS
- [react-icons](https://react-icons.github.io/react-icons/) - Icons

 ## Serverless
Serverless is a `cloud-native` development model that allows developers to build and run applications without having to manage servers.

There are still servers in serverless, but they are abstracted away from app development. A cloud provider handles the routine work of provisioning, maintaining, and scaling the server infrastructure. Developers can simply package their code in containers for deployment.

Each route of the application and all your code run entirely isolated within your sandbox and will not affect other resources.

## NextJS
The React Framework for the Web

### SSR
> `Server-side rendering`, the page HTML is generated on each request. **NodeJS** renders the page before the response get to the client 

### SSG

> `Static site generation`, the HTML is generated during build time. You can reuse (and reload) the whole page on each request.

## Stripe 
```console
npm install stripe
```

## Webhooks

`Webhook` (also called a **web callback** or **HTTP push API**) is a one-way communication from a source application to a destination application, and send notifications in near real time. Sending or receiving data is triggered when a certain event happens in one of the applications - unlike typical APIs where you would need to poll for data very frequently to get it in real time.

## FaunaDB 
```console
npm install faunadb
```

Sign in to FaunaDB and create a collection - `Region group`: **Classic (C)** <br />
Then create a index named `user_by_email` - Terms section === data.email. Select the unique option. <br />

Create a environment variable - **FAUNADB_KEY**

```javascript
import { Client as FaunaClient} from "faunadb";

const fauna = new FaunaClient({
  secret: process.env.FAUNADB_KEY!,
});
```
### FQL
> The Fauna Query Language (FQL) is the native API for querying Fauna.

Example: 

```javascript

import { Client as FaunaClient, query as q } from "faunadb";
...

export default NextAuth({
  providers: [],
  callbacks: {
    // Create and save a new user into the Database if do not exist yet
    // Otherwise get the user info
    async signIn({ user, account, profile }) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email!)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email!)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }
    },
  }
})
```

## JAMStack

> Jamstack is a term that describes a modern web development architecture based on `JavaScript`, `APIs`, and `Markup` (JAM). Jamstack isn't a specific technology or framework but a different architecture for building apps and websites.

### CMS
> A content management system (CMS) is an application that allowi multiple contributors to create, edit and publish. Content in a CMS is typically stored in a database and displayed in a presentation layer based on a set of templates like a website. The frontend and backend are coupled together.

### Headless CMS
> A headless CMS is a content management system where the **frontend** and **backend** are separated from each other. With headless CMSs, the stored content is made available to developers through **APIs**.Headless CMSs are frontend agnostic and API-driven by design

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
