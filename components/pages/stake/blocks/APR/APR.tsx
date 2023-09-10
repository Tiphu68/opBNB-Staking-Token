import React from 'react'
import style from './APR.module.scss'

const APR = () => {
  return (
    <>
    {/* Tokens don't have a real USD price. */}
      <div className={style.title} >APR</div>
      <div className={style.number} >40%</div>
    </>
  )
}

export default APR