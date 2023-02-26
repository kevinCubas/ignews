import style from "./styles.module.scss";

interface ISubscribeButtonProps {
  priceId: string,
}

export function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  return (
    <button 
      type="button"
      className={style.subscribeButton}
    >
      Subscribe now
    </button>
  )
}