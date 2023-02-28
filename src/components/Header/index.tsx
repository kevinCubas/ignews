import Image from "next/image";
import { useRouter } from "next/router";
import logoImg from "public/images/logo.svg";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import style from "./styles.module.scss";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={style['header-container']}>
      <div className={style['header-content']}>
        <Image src={logoImg} alt="" />
        <nav>
          <ActiveLink href={'/'} activeClassName={style['active']}>
            Home
          </ActiveLink>
          <ActiveLink href={"/posts"} activeClassName={style['active']} prefetch>
            Posts
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
};