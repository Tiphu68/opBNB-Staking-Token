import Link from "next/link";
import React from "react";
import style from "./Header.module.scss";
type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          Venos
          <br /> <span>Stakify</span>
        </div>
        <div className={style.subtitle}> Stake Venos, get Rewarded. </div>
        <div className={style.description}>
          {" "}
          The world&apos;s most advanced platform to start leveraging <br /> the
          full potential of Decentralised Finance.{" "}
        </div>
        <Link href="/mint">
          <a className={style.a} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Mint Now →
          </a>
        </Link>
      </div>
    </>
  );
};

export default Header;
