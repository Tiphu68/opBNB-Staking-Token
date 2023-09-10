import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import style from "./Navbar.module.scss";
import Ham from "./Ham/Ham";
type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={style.container}>
        <Link href="/">
          <div className={style.logo}>
            <Image src="/logo.png" width={50} height={50} />
          </div>
        </Link>
        <div className={open ? style.routeContainerOpen : style.routeContainer}>
          <Link href="/mint">
            <a className={style.route} onClick={() => setOpen(!open)}>
              Mint
            </a>
          </Link>
          <Link href="/stake">
            <a className={style.route} onClick={() => setOpen(!open)}>
              Stake
            </a>
          </Link>
          {/* <Link href="/whitepaper">
            <a className={style.route} onClick={() => setOpen(!open)}>
              Whitepaper
            </a>
          </Link> */}
        </div>
        <Ham open={open} setOpen={setOpen} />
      </div>
      <hr className={style.hr} />
    </>
  );
};

export default Navbar;
