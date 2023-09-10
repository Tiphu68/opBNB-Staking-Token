import Head from "next/head";
import React, { useContext } from "react";
import style from "./Layout.module.scss";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { checkConnection } from "../utils/checkConnection";
import { DeFiContext } from "../context/useContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const {
    setSigner,
    setAccount,
    setChainId,
    setProvider,
    setBlockchainData,
  }: any = useContext(DeFiContext);

  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setLoader(true);
    checkConnection({
      setSigner,
      setAccount,
      setChainId,
      setProvider,
      setBlockchainData,
    });
    setTimeout(() => setLoader(false), 2000);
  }, []);

  return (
    <>
      <Head>
        <title>DeFi</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {loader ? (
        <Loader />
      ) : (
        <div className={style.container}>
          <Navbar />
          <div className={style.childrenContainer}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Layout;
