import { Background, Blur, DivideLayer, Footer, Mask, TextLoading } from "@/components";
import style from "@/styles/sections/contact.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface componentProps {
  active: boolean
}

const contact = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const letterImage: imageProps = {
    src: require('@/public/icons/chat.svg'),
    alt: 'letterImage'
  }

  const footerRef = useRef<HTMLDivElement>(null);

  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);
  const [isProductNameShowing, setIsProductNameShowing] = useState<boolean>(false);

  const eraseMask = () => {
    maskAnimation();
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  useEffect(() => {
    if (isProductNameShowing) {
      setTimeout(eraseMask, 750);
    }
  }, [isProductNameShowing]);

  return (
    <>
      <Mask maskActive={props.active} onClick={eraseMask} startMaskAnimation={startMaskAnimation}>
        <div className={style.maskIcon}>
          <Image
            className={style.upperChat}
            src={letterImage.src}
            alt={letterImage.alt}
          ></Image>
          <Image
            className={style.lowerChat}
            src={letterImage.src}
            alt={letterImage.alt}
            onAnimationEnd={() => setIsProductNameShowing(true)}
          ></Image>
        </div>
        {
          isProductNameShowing ? (
            <h1 className={style.productName}>Contact</h1>
          )
          : (
            <TextLoading active={props.active && !isProductNameShowing}></TextLoading> 
          )
        }
      </Mask>
      <Background white>
        <Blur startBlurAnimation={startBlurAnimation}>
          <DivideLayer top></DivideLayer>
        </Blur>
      </Background>
      <Footer componentRef={footerRef}></Footer>
    </>
  )
}

export default contact;