import style from "@/styles/components/productName.module.css";
import { LegacyRef, ReactNode } from "react";

interface componentProps {
  children?: ReactNode,
  className: string,
  componentRef?: LegacyRef<HTMLDivElement>,
  onAnimationEnd?: Function
}

const productName = (props: componentProps) => {
  return (
    <div
      className={`${style.productName} ${props.className}`}
      ref={props.componentRef}
      onAnimationEnd={() => props.onAnimationEnd && props.onAnimationEnd()}
    >
      {props.children}
    </div>
  )
}

export default productName;