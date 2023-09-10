import React, { useEffect, useState } from "react";
import style from "./RewardAddress.module.scss";
import Image from "next/image";
import Link from "next/link";

const RewardAddress = () => {
  const address = "0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd";
  const [responsive, setResponsive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 1450) {
      setResponsive(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1450) {
        setResponsive(true);
      } else {
        setResponsive(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth <= 1450) {
          setResponsive(true);
        } else {
          setResponsive(false);
        }
      });
    };
  }, []);

  const copy = () => {
    navigator.clipboard.writeText("0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <div className={style.title}>Venos Token Address</div>
      <div className={style.value}>
        <Link target="_blank" href={`https://opbnbscan.com/address/${address}`}>
          {responsive
            ? `${address.slice(0, 8)}...${address.slice(34, 42)}`
            : "0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd"}
        </Link>
        <div className={style.img} onClick={copy}>
          <Image src="/copy.png" width={30} height={30} alt="copy" />
          <div className={copied ? style.copied : style.copiedFalse}>
            Copied!
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardAddress;
