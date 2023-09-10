import React from "react";
import style from "../styles/pages/whitepaper.module.scss";

const whitepaper = () => {
  return (
    <div className={style.container}>
      <div className={style.mainTitle}>DeFi Goerli - Whitepaper</div>
      <div className={style.mainDescription}>
        {" "}
        DeFi Goerli is a portfolio oriented project to show a piece of my
        knowledge.
        <br /> Some of the technologies used are: Next.js, Typescript, Sass,
        Hardhat, Solidity, Ethers.js, Typechain.{" "}
      </div>

      <div className={style.subContainer}>
        <div className={style.title}>Future Token</div>
        <div className={style.description}>
          Future is an ERC20 token with a maximum supply of 700000 VENOS
          (currently not fully minted).
          <br />
          Future can be minted and burned. You can only mint 15 tokens per
          address but burn indefinitely.
        </div>
      </div>

      <div className={style.subContainer}>
        <div className={style.title}>Reward Token</div>
        <div className={style.description}>
          Reward token is an ERC20 token that can only be obtained by staking
          Future tokens in our Staking pool.
          <br />
          Reward token is minted by the staking smart contract. It doesn&apos;t
          have a maximum supply.
        </div>
      </div>

      <div className={style.subContainer}>
        <div className={style.title}>Staking Pool</div>
        <div className={style.description}>
          The Staking pool allows you to get Reward tokens by staking your
          Future tokens.
          <br />
          The smart contract will mint 5184000 RWD tokens per day and distribute
          them among the stakers.
        </div>
      </div>
    </div>
  );
};

export default whitepaper;
