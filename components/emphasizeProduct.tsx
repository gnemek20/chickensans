import style from "@/styles/components/emphasizeProduct.module.css";
import { ReactNode } from "react";

interface componentProps {
  children?: ReactNode,
}

const emphasizeProduct = (props: componentProps) => {
  return (
    <div className={style.emphasizeProduct}>
      { props.children }
    </div>
  )
}

export default emphasizeProduct;