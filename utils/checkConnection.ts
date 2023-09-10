import { ethers } from "ethers"
import { QueryClient } from "react-query";
import { BlockchainData } from "../context/useContext";
import { getBlockchainData } from "./getData";

type getConnection = {
  setSigner: (provider: ethers.providers.JsonRpcSigner | null)=>void,
  setAccount: (account: string | null)=>void,
  setChainId: (chainId: number | null)=>void,
  setProvider: (provider: ethers.providers.Web3Provider)=>void,
  setBlockchainData: (blockchainData: BlockchainData)=> void,
}

export const checkConnection = async({ setSigner, setAccount, setChainId, setProvider, setBlockchainData }: getConnection)=>{

    if(window.ethereum){
  
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: Infinity,
            },
          },
        })
    
        const refetchData = async()=>{
          await queryClient.refetchQueries(['blockchainData'], { active: true })
        }
    
        window.ethereum
        .request({ method: 'eth_accounts' })
        .then(async (accounts: string[])=>{
          if(typeof accounts[0] !== 'undefined'){
            setAccount(accounts[0])
            const provider_ = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider_)
            const _signer = provider_.getSigner();
            getBlockchainData({provider: provider_, setBlockchainData})
            setSigner(_signer)
            await _signer.getChainId().then((res)=>setChainId(res)).catch((er)=>console.log(er))

            window.ethereum.on("accountsChanged", (accounts: string[]) => {
              setAccount(accounts[0]);
              if(typeof accounts[0] == 'undefined'){
                setChainId(null)
                setSigner(null)
              }
              refetchData()
            });
  
            window.ethereum.on("chainChanged", (chainId: number) => {
              setChainId(chainId)
              window.location.reload()
            });
          }
        })
        .catch((err: any) =>console.log(err))
        }
}