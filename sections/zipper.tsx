import style from "@/styles/sections/zipper.module.css";
import { useEffect, useRef } from "react";

interface componentProps {
  active: boolean
}

const zipper = (props: componentProps) => {
  const maskAnimationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.active && !maskAnimationRef.current?.classList.contains(style.active)) {
      setTimeout(() => maskAnimationRef.current?.classList.toggle(style.active), 500);
    }
  }, [props.active]);

  return(
    <>
      <div className={style.mask}>
        <div className={style.maskAnimation} ref={maskAnimationRef}>
          <div className={`${style.line}`}></div>
          <div className={`${style.productName}`}>
            <h1>Zipper</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default zipper;