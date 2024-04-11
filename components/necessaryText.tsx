import style from "@/styles/components/necessary.module.css";
import { ReactNode } from "react";

interface componentProps {
  children: ReactNode
}

const necessaryText = (props: componentProps) => {
  return (
    <div className={style.text}>
      <p>{ props.children }</p><p className={style.star}>*</p>
    </div>
  )
}

export default necessaryText;