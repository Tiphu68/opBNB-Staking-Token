import type { NextPage } from 'next'
import Header from '../components/pages/index/Header'
import Image from 'next/image'
import style from '../styles/pages/index.module.scss'
import img from '../public/images/graph.png'

const Home: NextPage = () => {

  const div: number = 1.4;

  return (
    <div>
      <div className={style.container} >
      <Header/>    
        <div className={style.imgContainer} >
          <Image src={img} width={916/ div} height={811/ div} quality={100} alt='graph money'/>
        </div>
      </div>
    </div>
  )
}

export default Home

//For typechain yarn add @typechain/ethers-v5 then npx typechain --target ethers-v5 "abi/*.json"
