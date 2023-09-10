import React, { useRef, useEffect } from 'react'
const ModelViewer = require('@metamask/logo');
import meshJson from './fade-fox.json'

const MetaLogo = () => {

  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    let widthFox = 500;
    let heightFox = 400;
    let followMouse = true;

    if(window.innerWidth <= 600){
      widthFox = 300
      heightFox = 300
      followMouse = false;
    }

    const viewer = ModelViewer({
      pxNotRatio: true,
      width: widthFox,
      height: heightFox,
      followMouse: followMouse,
      slowDrift: false,
      meshJson
    });
    

    if(metaRef && metaRef.current){
      metaRef.current.appendChild(viewer.container) 
    }


  }, [])
  
  return (
    <div ref={metaRef} />
  )
}

export default MetaLogo