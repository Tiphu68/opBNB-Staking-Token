import { BigNumber, ethers } from "ethers";
import { Future__factory } from "../types/ethers-contracts";
import abi from "../abi/StakeFuture.json";
import { BlockchainData } from "../context/useContext";

const FutureAddress = "0x84d4bBAf70C0851fBE877A9B8fEdE4494312EABd";
// const RewardAddress = '0x97F7BB30AFD27b0cc116491c71378678aC9cafC4'
const StakingAddress = "0xD87071e122f82A64F56dCf4134eECA0B8AC6acfF";

type GetData = {
  provider: ethers.providers.Web3Provider | null;
  setBlockchainData: (blockchainData: BlockchainData) => void;
};

export const getBlockchainData = async ({
  provider,
  setBlockchainData,
}: GetData) => {
  if (provider) {
    let _blockchainData: BlockchainData = {};

    const signer = provider.getSigner();

    const futureContract = Future__factory.connect(FutureAddress, signer);
    const userAddres = signer.getAddress();
    await futureContract
      .balanceOf(userAddres)
      .then(
        (res: BigNumber) =>
          (_blockchainData = {
            ..._blockchainData,
            FutureBalance: ethers.utils.formatEther(res),
          })
      )
      .catch((er: object) => console.log(er));

    await futureContract
      .balanceOf(StakingAddress)
      .then(
        (res: BigNumber) =>
          (_blockchainData = {
            ..._blockchainData,
            TotalStaked: ethers.utils.formatEther(res),
          })
      )
      .catch((er: object) => console.log(er));

    await futureContract
      .allowance(userAddres, StakingAddress)
      .then(
        (res: BigNumber) =>
          (_blockchainData = {
            ..._blockchainData,
            Allowed: 0 < Number(ethers.utils.formatEther(res)),
          })
      )
      .catch((er: object) => console.log(er));

    const stakingContract = new ethers.Contract(
      StakingAddress,
      abi.abi,
      provider
    );
    await stakingContract
      .earned(userAddres)
      .then(
        (res: BigNumber) =>
          (_blockchainData = {
            ..._blockchainData,
            RewardBalance: ethers.utils.formatEther(res),
          })
      )
      .catch((er: object) => console.log(er));

    //CHANGE SMART CONTRACT _balance FUNCTION, NOT TAKEN BY TYPECHAIN
    // const stakingContract = Future__factory.connect(StakingAddress, signer)
    await stakingContract
      ._balances(userAddres)
      .then(
        (res: BigNumber) =>
          (_blockchainData = {
            ..._blockchainData,
            StakedByUser: ethers.utils.formatEther(res),
          })
      )
      .catch((er: object) => console.log(er));

    setBlockchainData(_blockchainData);
  }
};
