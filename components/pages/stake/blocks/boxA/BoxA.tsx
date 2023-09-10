import { BigNumber, ethers } from "ethers";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { QueryClient } from "react-query";
import { DeFiContext } from "../../../../../context/useContext";
import {
  Future__factory,
  StakeFuture__factory,
} from "../../../../../types/ethers-contracts";
import Modal from "../../../../Modal/Modal";
import style from "./BoxA.module.scss";
import Spinner from "../../../../Spinner/Spinner";

const BoxA = () => {
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

  const StakingAddress = "0xD87071e122f82A64F56dCf4134eECA0B8AC6acfF";
  const VenosAddress = "0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd";

  const { blockchainData, account, signer, provider }: any =
    useContext(DeFiContext);

  const [modal, setModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAllowance = async () => {
      const venoContract = Future__factory.connect(VenosAddress, signer);
      await venoContract
        .allowance(account, StakingAddress)
        .then((res: BigNumber) =>
          setAllowed(0 < Number(ethers.utils.formatEther(res)))
        )
        .catch((er: object) => console.log(er));
    };

    if (account && signer) {
      checkAllowance();
    }
  }, [account, signer]);

  const handleAllowance = async () => {
    const contract = Future__factory.connect(VenosAddress, signer);
    await contract
      .approve(StakingAddress, ethers.utils.parseEther("700000"))
      .then((res: ethers.ContractTransaction) => {
        setLoading(true);
        provider.once(res.hash, () => {
          setAllowed(true);
          setLoading(false);
        });
      })
      .catch((er: object) => {
        setLoading(false);
        console.log(er);
      });
  };

  const handleUnstake = async () => {
    if (signer && account) {
      const contract = StakeFuture__factory.connect(StakingAddress, signer);

      await contract
        .withdraw(ethers.utils.parseEther(blockchainData.StakedByUser))
        .then((res: ethers.ContractTransaction) =>
          provider.once(res.hash, refetchData)
        )
        .catch((er: object) => console.log(er));
    }
  };

  const handleStake = async () => {
    if (signer && account && amount) {
      const contract = StakeFuture__factory.connect(StakingAddress, signer);

      await contract
        .stake(ethers.utils.parseEther(amount))
        .then((res: ethers.ContractTransaction) =>
          provider.once(res.hash, refetchData)
        )
        .catch((er: object) => console.log(er));
      setAmount("");
    }
  };

  const getReward = async () => {
    if (signer && account) {
      const contract = StakeFuture__factory.connect(StakingAddress, signer);

      await contract
        .getReward()
        .then((res: ethers.ContractTransaction) =>
          provider.once(res.hash, refetchData)
        )
        .catch((er: object) => console.log(er));
    }
  };

  const handleModal = () => {
    setModal(true);
    setTimeout(() => document.getElementById("amountInput")?.focus(), 0);
  };

  return (
    <>
      <div className={style.title}> My Venos Staking </div>

      <div className={style.info}>
        <div className={style.staked}>
          <div className={style.stakedTitle}>TOTAL STAKED</div>
          <div className={style.stakedBalance}>
            {blockchainData?.StakedByUser
              ? Number(blockchainData?.StakedByUser)
              : "--"}{" "}
            VENOS
          </div>
        </div>

        <div className={style.inWallet}>
          <div className={style.inWalletTitle}>AVAILABLE IN WALLET</div>
          <div className={style.inWalletBalance}>
            {blockchainData?.FutureBalance
              ? Number(blockchainData?.FutureBalance)
              : "--"}{" "}
            VENOS
          </div>
        </div>
      </div>

      <div className={style.rewardContainer}>
        <div className={style.rewardInfo}>
          <div className={style.rewardTitle}>CLAIMABLE REWARDS</div>
          <div className={style.rewardBalance}>
            {blockchainData?.RewardBalance
              ? Number(blockchainData?.RewardBalance)
              : "--"}{" "}
            <span>VENOS</span>
          </div>
        </div>

        <button
          className={style.claim}
          disabled={parseInt(blockchainData?.RewardBalance) == 0}
          onClick={getReward}
        >
          Claim
        </button>
      </div>

      <div className={style.btnContainer}>
        {allowed || blockchainData.Allowed ? (
          <>
            <button className={style.stakeBTN} onClick={handleModal} key="0">
              Stake
            </button>
            <button className={style.unstakeBTN} onClick={handleUnstake}>
              Unstake
            </button>
          </>
        ) : (
          <button className={style.unstakeBTN} onClick={handleAllowance}>
            {loading ? <Spinner /> : "Authorize"}
          </button>
        )}
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className={style.modalContainer}>
          <div className={style.titleModal}>Stake Future</div>
          <input
            id="amountInput"
            onKeyPress={(event) => {
              if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            type="number"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            className={style.input}
            placeholder="set Amount"
          />
          <button className={style.modalStakeBTN} onClick={handleStake}>
            Stake Now
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BoxA;
