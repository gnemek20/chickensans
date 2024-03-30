import { EmphasizeScroll } from "@/components";
import style from "@/styles/sections/zipper.module.css";
import { useEffect, useRef } from "react";

interface componentProps {
  active: boolean
}

const zipper = (props: componentProps) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const maskAnimationRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  const deleteMask = () => {
    setTimeout(maskFadeOut, 650);
  }
  const maskFadeOut = () => {
    maskRef.current?.classList.toggle(style.maskFadeOut);
    blurRef.current?.classList.toggle(style.blur);
  }

  useEffect(() => {
    if (props.active && !maskAnimationRef.current?.classList.contains(style.active)) {
      setTimeout(() => maskAnimationRef.current?.classList.toggle(style.active), 500);
    }
  }, [props.active]);

  return(
    <>
      <div className={style.mask} ref={maskRef}>
        <div className={style.maskAnimation} ref={maskAnimationRef}>
          <div className={`${style.line}`}></div>
          <div className={`${style.productName}`}>
            <h1 onAnimationEnd={deleteMask}>Zipper</h1>
          </div>
        </div>
      </div>
      <div className={style.background}>
        <div className={style.blur} ref={blurRef}>
          <div className={style.emphasizeProduct}>
            <h1>Long lasting Best soft Zipper</h1>
            <p>오래도록 부드러운 최고의 지퍼를 제공합니다.</p>
          </div>
        </div>
      </div>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default zipper;