import React, { useContext, useEffect, useState } from "react";
import style from "./Connect.module.scss";
import MetaLogo from "./metamask/MetaLogo";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { DeFiContext } from "../../context/useContext";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getBlockchainData } from "../../utils/getData";
import { QueryClient, useQuery } from "react-query";

interface Props {
  children: React.ReactNode;
}

const Connect = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const refetchData = async () => {
    await queryClient.refetchQueries(["blockchainData"], { active: true });
  };

  let web3modal: Web3Modal;

  const {
    setSigner,
    setAccount,
    setChainId,
    chainId,
    account,
    setProvider,
    provider,
    setBlockchainData,
  }: any = useContext(DeFiContext);

  const { error } = useQuery(
    ["blockchainData"],
    () => getBlockchainData({ provider, setBlockchainData }),
    {
      enabled: Boolean(account),
      refetchInterval: 15000,
    }
  );

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "7fdd6b5a027641cf910c6c1cc6635610",
      },
    },
  };

  if (typeof window != "undefined") {
    web3modal = new Web3Modal({
      //this is the network that will show up as default in trust wallet
      // network:"goerli",
      cacheProvider: true,
      providerOptions, // required
      theme: "dark",
    });
  }

  useEffect(() => {
    localStorage.removeItem("walletconnect");
    web3modal.clearCachedProvider();
  }, []);

  async function connect() {
    const provider = await web3modal.connect().catch((er) => console.log(er));

    if (provider) {
      const provider_ = new ethers.providers.Web3Provider(provider);
      setProvider(provider_);

      const _signer = provider_.getSigner();
      setSigner(_signer);
      await _signer
        .getAddress()
        .then((res) => setAccount(res))
        .catch((er) => console.log(er));
      await _signer
        .getChainId()
        .then((res) => setChainId(res))
        .catch((er) => console.log(er));

      provider.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
        if (typeof accounts[0] == "undefined") {
          setChainId(null);
          setSigner(null);
          web3modal.clearCachedProvider();
          localStorage.removeItem("walletconnect");
        }
        refetchData();
      });

      provider.on("chainChanged", (chainId: number) => {
        setChainId(chainId);
        window.location.reload();
      });
    }
  }

  function disconnect() {
    web3modal.clearCachedProvider();
    localStorage.removeItem("walletconnect");
    setAccount(null);
    setSigner(null);
    setChainId(null);
  }

  return (
    <>
      <div className={style.container}>
        {chainId && account ? (
          chainId == 5611 || chainId == 0x5611 ? (
            children
          ) : (
            <>
              <MetaLogo />
              <div className={style.chainId}>
                Please, change to opBNB Network
              </div>
            </>
          )
        ) : (
          <>
            <MetaLogo />
            <button className={style.btn} onClick={connect}>
              Connect your Wallet
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Connect;
