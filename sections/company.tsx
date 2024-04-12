import { Background, Blur, DivideLayer, EmphasizeProduct, Mask, ProductName } from "@/components";
import style from "@/styles/sections/company.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useState } from "react";
import Image from "next/image";

interface componentProps {
  active: boolean
}

const company = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const companyIcon: imageProps = {
    src: require('@/public/icons/company.svg'),
    alt: 'companyIcon'
  }

  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    maskAnimation();
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  useEffect

  return (
    <>
      <Mask maskActive={props.active} onClick={eraseMask} startMaskAnimation={startMaskAnimation}>
        <div className={style.maskIcon}>
          <div className={style.spotlight}></div>
          <Image
            className={style.company}
            src={companyIcon.src}
            alt={companyIcon.alt}
          ></Image>
        </div>
        <ProductName
          className={style.productName}
          onAnimationEnd={() => setTimeout(eraseMask, 500)}
        >
          <h1>
            Company
          </h1>
        </ProductName>
      </Mask>
      <Background white>
        <Blur startBlurAnimation={startBlurAnimation}>
          <DivideLayer></DivideLayer>

        </Blur>
      </Background>
    </>
  )
}

export default company;