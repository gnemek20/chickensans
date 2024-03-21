import { ReactNode } from "react";
import style from "@/styles/content.module.css";

interface componentProps {
  children?: ReactNode
}

const content = (props: componentProps) => {
  return (
    <div
      className={style.container}
    >
      { props.children?? props.children }
    </div>
  )
}

export default content;