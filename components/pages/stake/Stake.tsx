import React from "react";
import APR from "./blocks/APR/APR";
import BoxA from "./blocks/boxA/BoxA";
import Staked from "./blocks/Staked/Staked";
import RewardAddress from "./blocks/RewardAddress/RewardAddress";
import style from "./Stake.module.scss";

const Stake = () => {
  return (
    <div className={style.container}>
      <div className={style.title}> Venos Staking Dashboard </div>

      <div className={style.boxContainer}>
        <div className={style.boxA}>
          <BoxA />
        </div>

        <div className={style.boxB}>
          <div className={style.StatsA}>
            <div className={style.Staked}>
              <Staked />
            </div>
            <div className={style.APR}>
              <APR />
            </div>
          </div>

          <div className={style.RewardAddress}>
            <RewardAddress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
