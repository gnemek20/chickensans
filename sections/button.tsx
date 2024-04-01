import style from "@/styles/sections/button.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Background, Blur, EmphasizeProduct, EmphasizeScroll, Mask, ProductName } from "@/components";

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

  const buttonIconRef = useRef<HTMLDivElement>(null);
  const productNameRef = useRef<HTMLDivElement>(null);

  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [reverseMask, setReverseMask] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    setTimeout(maskAnimation, 750);
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

  useEffect(() => {
    if (props.active) {
      setMaskActive(true);
    }
  }, [props.active]);

  return (
    <>
      <Mask maskActive={maskActive} startMaskAnimation={startMaskAnimation} reverseMask={reverseMask}>
        <div className={style.buttonIcon} ref={buttonIconRef}>
          <Image
            className={`${style.buttonImage} ${style.leftButton}`}
            src={buttonIcon.src}
            alt={buttonIcon.alt}
          ></Image>
          <Image
            className={`${style.buttonImage} ${style.rightButton}`}
            src={buttonIcon.src}
            alt={buttonIcon.alt}
            onAnimationEnd={startReversingMask}
          ></Image>
        </div>
          <ProductName
            className={style.productName}
            componentRef={productNameRef}
            onAnimationEnd={eraseMask}
          >
            <h1>Button</h1>
          </ProductName>
      </Mask>
      <Background>
        <Blur startBlurAnimation={startBlurAnimation}>
          <EmphasizeProduct>
            <h1>Gesture to Open the World</h1>
            <p>절대로 해지지 않는 단단한 버튼을 제공합니다.</p>
          </EmphasizeProduct>
        </Blur>
      </Background>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default button;