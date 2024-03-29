import style from "@/styles/sections/zipper.module.css";
import { useEffect, useRef } from "react";

interface componentProps {
  active: boolean
}

const zipper = (props: componentProps) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const maskAnimationRef = useRef<HTMLDivElement>(null);

  const deleteMask = () => {
    setTimeout(maskFadeOut, 650);
  }
  const maskFadeOut = () => {
    maskRef.current?.classList.toggle(style.maskFadeOut);
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
    </>
  )
}

export default zipper;