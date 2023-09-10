import { createContext, useState } from "react"
import { ethers } from "ethers"

export type BlockchainData = {
    FutureBalance?: string,
    TotalStaked?: string,
    Allowed?:boolean;
    RewardBalance?: string,
    StakedByUser?: string,
}

export type contextType = {
    chainId: number | null,
    setChainId: (chainId: number | null)=>void,
    account: string | null,
    setAccount: (account: string | null)=>void,
    provider:ethers.providers.Web3Provider | null,
    setProvider: (provider: ethers.providers.Web3Provider | null)=>void,
    signer: ethers.providers.JsonRpcSigner | null,
    setSigner: (provider: ethers.providers.JsonRpcSigner | null)=>void,
    blockchainData: BlockchainData | null,
    setBlockchainData: (blockchainData: BlockchainData | null)=> void,
}


export const DeFiContext = createContext<contextType | null>(null);

interface Props {
    children: React.ReactNode;
}

const DeFiProvider: React.FC<Props> = ({ children }) => {

    const [chainId, setChainId] = useState<number | null>(null)
    const [account, setAccount] = useState<string | null>(null)
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null)

    return (
        <div>
            <DeFiContext.Provider value={{ chainId, setChainId, account, setAccount, provider, setProvider, signer, setSigner, blockchainData, setBlockchainData }}>
                {children}
            </DeFiContext.Provider>
        </div>
    );
}

export default DeFiProvider;