import Image from "next/image";
import Link from "next/link";
import logoImg from "public/images/logo.svg";
import { SignInButton } from "../SignInButton";
import style from "./styles.module.scss";

export function Header() {
  return (
    <header className={style['header-container']}>
      <div className={style['header-content']}>
        <Image src={logoImg} alt="" />
        <nav>
          <Link href={'/'} className={style['active']}>Home</Link>
          <Link href={"/posts"} prefetch>Posts</Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
};