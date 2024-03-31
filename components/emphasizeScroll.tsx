import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/components/emphasizeScroll.module.css";

interface componentProps {
  black?: boolean
}

const emphasizeScroll = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const arrowDownImage: imageProps = {
    src: require('@/public/icons/arrow.svg'),
    alt: 'arrowDownImage'
  }

  return (
    <Image
      className={`${style.arrowDown} ${props.black && style.black}`}
      src={arrowDownImage.src}
      alt={arrowDownImage.alt}
    ></Image>
  )
}

export default emphasizeScroll;