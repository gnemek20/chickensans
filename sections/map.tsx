import { Background, Blur, EmphasizeProduct, EmphasizeScroll, Mask, ProductName } from "@/components";
import style from "@/styles/sections/map.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface componentProps {
  active: boolean
}

const map = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const boardIcon: imageProps = {
    src: require('@/public/icons/map.svg'),
    alt: 'mapIcon'
  }
  const placeholderIcon: imageProps = {
    src: require('@/public/icons/placeholder.svg'),
    alt: 'placeholderIcon'
  }

  const boardRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const productNameRef = useRef<HTMLDivElement>(null);

  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);

  const eraseMask = () => {
    setTimeout(maskAnimation, 700);
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    // setStartBlurAnimation(true);
  }

  const resizeMapIcon = () => {
    setTimeout(reduceSizeMapIcon, 250);
  }
  const reduceSizeMapIcon = () => {
    boardRef.current?.classList.toggle(style.resizeBoard);
    placeholderRef.current?.classList.toggle(style.resizePlaceholder);
    productNameRef.current?.classList.toggle(style.slideInProductName);
  }
  const startMapIconAnimation = () => {
    if (!(boardRef.current?.classList.contains(style.hoverBoard) || placeholderRef.current?.classList.contains(style.hoverPlaceholder))) {
      boardRef.current?.classList.toggle(style.hoverBoard);
      placeholderRef.current?.classList.toggle(style.hoverPlaceholder);
    }
  }

  useEffect(() => {
    if (props.active) setMaskActive(true);
  }, [props.active]);

  return (
    <>
      <Mask maskActive={maskActive} startMaskAnimation={startMaskAnimation}>
        <div className={style.mapIcon}>
          <Image
            className={style.board}
            ref={boardRef}
            src={boardIcon.src}
            alt={boardIcon.alt}
            onAnimationEnd={resizeMapIcon}
            onTransitionEnd={startMapIconAnimation}
          ></Image>
          <Image
            className={style.placeholder}
            ref={placeholderRef}
            src={placeholderIcon.src}
            alt={placeholderIcon.alt}
          ></Image>
        </div>
        <ProductName
          className={style.productName}
          componentRef={productNameRef}
          onAnimationEnd={eraseMask}
        >
          <h1>Map</h1>
        </ProductName>
      </Mask>
      <Background>
      </Background>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default map;