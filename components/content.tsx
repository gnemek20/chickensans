import { ReactNode } from "react";
import style from "@/styles/components/content.module.css";

interface componentProps {
  children?: ReactNode
}

const content = (props: componentProps) => {
  return (
    <div
      className={style.container}
    >
      <div
        className={style.wrapper}
      >
        { props.children?? props.children }
      </div>
    </div>
  )
}

export default content;