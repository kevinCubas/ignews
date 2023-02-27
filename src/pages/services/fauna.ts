import { Client as FaunaClient, query as q } from "faunadb";

export const fauna = new FaunaClient({
  secret: process.env.FAUNADB_KEY!,
});