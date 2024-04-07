import style from "@/styles/components/divideLayer.module.css";
import { useEffect, useRef } from "react";

interface componentProps {
  top?: boolean,
  percent?: number
}

const divideLayer = (props: componentProps) => {
  const divideLineRef = useRef<HTMLDivElement>(null);
  const divideLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.percent) return;

    divideLineRef.current?.style.setProperty('top', `${props.percent}%`);
    divideLayerRef.current?.style.setProperty('height', `${props.percent}%`);
  }, [props.percent]);

  return (
    <>
      <div className={style.divideLine} ref={divideLineRef}></div>
      <div className={`${style.divideLayer} ${props.top && style.positionTop}`} ref={divideLayerRef}></div>
    </>
  )
}

export default divideLayer;