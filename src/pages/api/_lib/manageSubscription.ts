import { fauna } from "@/pages/services/fauna";
import { stripe } from "@/pages/services/stripe";
import { query as q} from "faunadb";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  // search user using customerId
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // save subscription in the Database
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }
  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}