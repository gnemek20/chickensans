import { EmphasizeScroll, EmphasizeProduct, Blur, Mask, Background } from "@/components";
import style from "@/styles/sections/zipper.module.css";
import { useEffect, useRef, useState } from "react";

interface componentProps {
  active: boolean
}

const zipper = (props: componentProps) => {
  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    setTimeout(maskAnimation, 600);
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  useEffect(() => {
    if (props.active) {
      setMaskActive(true);
    }
  }, [props.active]);

  return(
    <>
      <Mask maskActive={maskActive} startMaskAnimation={startMaskAnimation}>
        <div className={`${style.line}`}></div>
        <div className={`${style.productName}`}>
          <h1 onAnimationEnd={eraseMask}>Zipper</h1>
        </div>
      </Mask>
      <Background>
        <Blur startBlurAnimation={startBlurAnimation}>
          <EmphasizeProduct>
            <h1>Long lasting Best soft Zipper</h1>
            <p>오래도록 부드러운 최고의 지퍼를 제공합니다.</p>
          </EmphasizeProduct>
        </Blur>
      </Background>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default zipper;