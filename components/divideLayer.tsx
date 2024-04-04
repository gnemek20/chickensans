import style from "@/styles/components/divideLayer.module.css";

interface componentProps {
  top?: boolean
}

const divideLayer = (props: componentProps) => {
  return (
    <div className={`${style.divideLayer} ${props.top && style.positionTop}`}></div>
  )
}

export default divideLayer;