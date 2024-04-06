import style from "@/styles/components/mask.module.css";
import { ReactNode, useEffect, useRef } from "react";

interface componentProps {
  children?: ReactNode,
  maskActive: boolean,
  startMaskAnimation: boolean,
  reverseMask?: boolean,
  onAnimationEnd?: Function,
  onClick?: Function
}

const mask = (props: componentProps) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const maskAnimationRef = useRef<HTMLDivElement>(null);

  const onMaskAnimationEnd = () => {
    if (props.startMaskAnimation) props.onAnimationEnd && props.onAnimationEnd();
  }

  useEffect(() => {
    if (props.reverseMask && !maskRef.current?.classList.contains(style.reverseMask)) {
      maskRef.current?.classList.toggle(style.reverseMask);
    }
  }, [props.reverseMask]);

  useEffect(() => {
    if (props.startMaskAnimation && !maskRef.current?.classList.contains(style.maskFadeOut)) {
      maskRef.current?.classList.toggle(style.maskFadeOut);
    }
  }, [props.startMaskAnimation]);

  useEffect(() => {
    if (props.maskActive && !maskAnimationRef.current?.classList.contains(style.active)) {
      setTimeout(() => maskAnimationRef.current?.classList.toggle(style.active), 500);
    }
  }, [props.maskActive]);

  return (
    <div className={style.mask} ref={maskRef} onClick={() => props.onClick && props.onClick()} onAnimationEnd={onMaskAnimationEnd}>
      <div className={style.maskAnimation} ref={maskAnimationRef}>
        { props.children }
      </div>
    </div>
  )
}

export default mask;