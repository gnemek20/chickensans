import style from "@/styles/sections/button.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Background, Blur, DivideLayer, EmphasizeProduct, EmphasizeScroll, Mask, ProductName } from "@/components";

interface componentProps {
  active: boolean
}

const button = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const buttonIcon: imageProps = {
    src: require('@/public/icons/button.svg'),
    alt: 'buttonIcon'
  }

  const buttonImage: imageProps = {
    src: require('@/public/images/button.jpg'),
    alt: 'buttonImage'
  }

  const buttonIconRef = useRef<HTMLDivElement>(null);
  const productNameRef = useRef<HTMLDivElement>(null);

  const buttonImageRef = useRef<HTMLImageElement>(null);
  const buttonImageShadowRef = useRef<HTMLDivElement>(null);

  const introduceNameRef = useRef<HTMLHeadingElement>(null);
  const introduceDescriptionRef = useRef<HTMLDivElement>(null);

  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [reverseMask, setReverseMask] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    maskAnimation();
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  const startReversingMask = () => {
    setReverseMask(true);
    buttonIconRef.current?.classList.toggle(style.reverseIcon);
    productNameRef.current?.classList.toggle(style.productNameFadeIn);
  }

  const showIntroduce = () => {
    if (!buttonImageRef.current?.classList.contains(style.buttonImageSlideIn)) {
      buttonImageRef.current?.classList.toggle(style.buttonImageSlideIn);
      buttonImageShadowRef.current?.classList.toggle(style.buttonImageSlideIn);
      introduceNameRef.current?.classList.toggle(style.introduceNameSlideIn);
      introduceDescriptionRef.current?.classList.toggle(style.introduceDescriptionSlideIn);
    }
  }

  useEffect(() => {
    if (props.active) {
      setMaskActive(true);
    }
  }, [props.active]);

  return (
    <>
      <Mask maskActive={maskActive} onClick={eraseMask} startMaskAnimation={startMaskAnimation} reverseMask={reverseMask} onAnimationEnd={showIntroduce}>
        <div className={style.buttonIcon} ref={buttonIconRef}>
          <Image
            className={`${style.icon} ${style.leftButton}`}
            src={buttonIcon.src}
            alt={buttonIcon.alt}
          ></Image>
          <Image
            className={`${style.icon} ${style.rightButton}`}
            src={buttonIcon.src}
            alt={buttonIcon.alt}
            onAnimationEnd={startReversingMask}
          ></Image>
        </div>
        <ProductName
          className={style.productName}
          componentRef={productNameRef}
          onAnimationEnd={() => setTimeout(eraseMask, 750)}
        >
          <h1>Button</h1>
        </ProductName>
      </Mask>
      <Background white>
        <Blur startBlurAnimation={startBlurAnimation}>
          <EmphasizeProduct>
            <h1>Gesture to Open the World</h1>
            <p>절대로 해지지 않는 단단한 단추를 제공해 드립니다.</p>
          </EmphasizeProduct>
          <DivideLayer top percent={57.5}></DivideLayer>
          <div className={style.introduceText}>
            <h1 className={style.introduceName} ref={introduceNameRef}>Snap Button</h1>
            <div className={style.introduceDescription} ref={introduceDescriptionRef}>
              <p>마찬가지로 텍스트를 채우면 됩니다.</p>
              <p>여러 문장으로 채워주세요.</p>
              <br />
              <p>문장이 길수록 좀 더 이쁘게 보여요!</p>
              <p>텍스트 크기 조절도 가능합니다.</p>
            </div>
          </div>
          <div className={style.buttonImageShadow} ref={buttonImageShadowRef}></div>
          <Image
            className={style.buttonImage}
            ref={buttonImageRef}
            src={buttonImage.src}
            alt={buttonImage.alt}
          ></Image>
        </Blur>
      </Background>
      <EmphasizeScroll black></EmphasizeScroll>
    </>
  )
}

export default button;