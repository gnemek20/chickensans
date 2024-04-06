import { EmphasizeScroll, EmphasizeProduct, Blur, Mask, Background, ProductName, DivideLayer } from "@/components";
import style from "@/styles/sections/zipper.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface componentProps {
  active: boolean
}

const zipper = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const sampleImage: imageProps = {
    src: require('@/public/images/zipper.jpg'),
    alt: 'sampleImage'
  }

  const halfZipperIcon: imageProps = {
    src: require('@/public/icons/halfZipper.png'),
    alt: 'halfZipperIcon'
  }

  const introduceNameRef = useRef<HTMLHeadingElement>(null);
  const introduceDescriptionRef = useRef<HTMLDivElement>(null);
  const dummyBackgroundRef = useRef<HTMLDivElement>(null);
  const introduceImageRef = useRef<HTMLImageElement>(null);

  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    maskAnimation();
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  const showIntroduce = () => {
    if (!introduceNameRef.current?.classList.contains(style.introduceNameSlideIn)) {
      introduceNameRef.current?.classList.toggle(style.introduceNameSlideIn);
      introduceDescriptionRef.current?.classList.toggle(style.introduceDescriptionSlideIn);
      dummyBackgroundRef.current?.classList.toggle(style.dummyBackgroundSlideIn);
      introduceImageRef.current?.classList.toggle(style.introduceImageSlideIn);
    }
  }

  useEffect(() => {
    if (props.active) {
      setMaskActive(true);
    }
  }, [props.active]);

  return(
    <>
      <Mask maskActive={maskActive} onClick={eraseMask} startMaskAnimation={startMaskAnimation} onAnimationEnd={showIntroduce}>
        <div className={style.lineContainer}>
          <Image
            className={`${style.line} ${style.leftLine}`}
            src={halfZipperIcon.src}
            alt={halfZipperIcon.alt}
          ></Image>
          <Image
            className={`${style.line} ${style.rightLine}`}
            src={halfZipperIcon.src}
            alt={halfZipperIcon.alt}
          ></Image>
        </div>
        <ProductName className={style.productName}>
          <h1 onAnimationEnd={() => setTimeout(eraseMask, 600)}>Zipper</h1>
        </ProductName>
      </Mask>
      <Background white>
        <Blur startBlurAnimation={startBlurAnimation}>
          <EmphasizeProduct>
            <h1>Long lasting Best soft Zipper</h1>
            <p>오래도록 부드러운 최고의 지퍼로 가공해 드립니다.</p>
          </EmphasizeProduct>
          <DivideLayer></DivideLayer>
          <div className={style.introduce}>
            <div className={style.introduceText}>
              <h1 className={style.introduceName} ref={introduceNameRef}>Coil Zipper</h1>
              <div className={style.introduceDescription} ref={introduceDescriptionRef}>
                <p>코일 모양의 부드럽고 유연한 지퍼입니다.</p>
                <p>여러줄의 설명이 들어갑니다.</p>
                <p>코일 지퍼만의 장점을 설명합니다.</p>
                <br />
                <p>문단 넘기기도 가능합니다.</p>
                <p>알맞은 텍스트로 채워주세요.</p>
              </div>
            </div>
            <div className={style.dummyBackground} ref={dummyBackgroundRef}></div>
            <div className={style.introduceImage} ref={introduceImageRef}>
              <Image
                src={sampleImage.src}
                alt={sampleImage.alt}
                width={400}
              ></Image>
              <div className={style.imageBorder}></div>
            </div>
          </div>
        </Blur>
      </Background>
      <EmphasizeScroll black></EmphasizeScroll>
    </>
  )
}

export default zipper;