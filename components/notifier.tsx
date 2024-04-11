import style from "@/styles/components/notifier.module.css";
import { ReactNode } from "react";

interface componentProps {
  children: ReactNode,
  isShowing: boolean
}

const notifier = (props: componentProps) => {
  return (
    props.isShowing && (
      <div className={style.container}>
        { props.children }
      </div>
    )
  )
}

export default notifier;