import style from "@/styles/components/blur.module.css";
import { ReactNode, useEffect, useRef } from "react";

interface componentProps {
  children?: ReactNode,
  startBlurAnimation: boolean
}

const blur = (props: componentProps) => {
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.startBlurAnimation && blurRef.current?.classList.contains(style.blur)) {
      blurRef.current?.classList.toggle(style.blur);
    }
  }, [props.startBlurAnimation]);

  return (
    <div className={`${style.blurContainer} ${style.blur}`} ref={blurRef}>
      { props.children }
    </div>
  )
}

export default blur;