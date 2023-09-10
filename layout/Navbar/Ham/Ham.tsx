import React from 'react'
import style from './Ham.module.scss'

type Props = {
    open:boolean,
    setOpen:(open:boolean)=> void,
}

const Ham = ({ open, setOpen }: Props) => {
  return (
    <div className={open ? style.centerActive : style.center} onClick={()=>setOpen(!open)} >
  <div></div>
</div>
  )
}

export default Ham