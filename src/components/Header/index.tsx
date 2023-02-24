import Image from "next/image";
import logoImg from "public/images/logo.svg";
import style from "./styles.module.scss";

export function Header() {
  return (
    <header className={style['header-container']}>
      <div className={style['header-content']}>
        <Image src={logoImg} alt="" />
        <nav>
          <a className={style['active']}>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </header>
  )
};