import style from "@/styles/components/background.module.css";
import { ReactNode } from "react";

interface componentProps {
  children?: ReactNode
  white?: boolean
}

const background = (props: componentProps) => {
  return (
    <div className={`${style.background} ${props.white && style.white}`}>
      { props.children }
    </div>
  )
}

export default background;