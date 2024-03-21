import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/background.module.css";

interface componentProps {
  src: StaticImport,
  alt: string
}

const background = (props: componentProps) => {
  return (
    <div>
      <Image
        className={style.image}
        src={props.src}
        alt={props.alt}
      ></Image>
      <div
        className={style.dimmed}
      ></div>
    </div>
  )
}

export default background;