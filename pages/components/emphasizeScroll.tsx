import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/emphasizeScroll.module.css";

const emphasizeScroll = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const arrowDownImage: imageProps = {
    src: require('@/public/icons/arrowDown.svg'),
    alt: 'arrowDownImage'
  }

  return (
    <Image
      className={style.arrowDown}
      src={arrowDownImage.src}
      alt={arrowDownImage.alt}
    ></Image>
  )
}

export default emphasizeScroll;