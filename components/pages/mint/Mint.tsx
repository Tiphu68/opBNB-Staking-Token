import React, { ChangeEvent, useContext, useState } from "react";
import Connect from "../../Connect/Connect";
import { DeFiContext } from "../../../context/useContext";
import style from "./Mint.module.scss";
import Image from "next/image";
import { ethers } from "ethers";
import { Future__factory } from "../../../types/ethers-contracts";
import { QueryClient } from "react-query";

const Mint = () => {
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

  const { account, signer, provider, blockchainData }: any =
    useContext(DeFiContext);

  const [amount, setAmount] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const VenosAddress = "0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd";

  const handleMint = async () => {
    if (signer && account && amount) {
      const contract = Future__factory.connect(VenosAddress, signer);

      await contract
        .mint(account, ethers.utils.parseEther(amount))
        .then((res: ethers.ContractTransaction) =>
          provider.once(res.hash, refetchData)
        )
        .catch((er: object) => console.log(er));
      setAmount("");
    }
  };

  const handleBurn = async () => {
    if (signer && account && amount) {
      const contract = Future__factory.connect(VenosAddress, signer);

      await contract
        .burn(ethers.utils.parseEther(amount))
        .then((res: ethers.ContractTransaction) =>
          provider.once(res.hash, refetchData)
        )
        .catch((er: object) => console.log(er));
      setAmount("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(VenosAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div>
      <Connect>
        <div className={style.container}>
          <div className={style.title}>Blockchain Data:</div>

          <hr className={style.hr} />

          <div className={style.balanceTitle}>Venos Balance:</div>

          <div className={style.balance}>
            {blockchainData?.FutureBalance
              ? Number(blockchainData?.FutureBalance)
              : "--"}{" "}
            VENOS
          </div>

          <div className={style.balanceTitle}>Your Address:</div>
          <div className={style.balance}>
            {`${account?.slice(0, 8)}...${account?.slice(34, 42)}`}

            <div className={style.img} onClick={copy}>
              <Image src="/copy.png" width={30} height={30} alt="copy" />
              <div className={copied ? style.copied : style.copiedFalse}>
                Copied!
              </div>
            </div>
          </div>

          <div className={style.titleMint}>Mint / Burn:</div>
          <input
            onKeyPress={(event) => {
              if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            autoFocus
            type="number"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            className={style.input}
            placeholder="set Amount"
          />
          <div className={style.btnContainer}>
            <button className={style.btn} onClick={handleMint}>
              MINT
            </button>
            <button className={style.btn} onClick={handleBurn}>
              BURN
            </button>
          </div>
        </div>
      </Connect>
    </div>
  );
};

export default Mint;
