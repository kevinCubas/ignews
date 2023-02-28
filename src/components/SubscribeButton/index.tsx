import { api } from "@/pages/services/api";
import { getStripeJs } from "@/pages/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import style from "./styles.module.scss";

interface ISubscribeButtonProps {
  priceId: string,
}

export function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if(!session) {
      signIn('github')
      return;
    }

    if(session.activeSubscription) {
      router.push('/posts');
      return 
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe!.redirectToCheckout({sessionId})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <button 
      type="button"
      className={style.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}