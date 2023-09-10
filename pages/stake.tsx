import React from 'react'
import Connect from '../components/Connect/Connect'
import Stake from '../components/pages/stake/Stake'

type Props = {}

const stake = (props: Props) => {
  return (
    <Connect>
      <Stake/>
    </Connect>
  )
}

export default stake