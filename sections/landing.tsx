import { EmphasizeScroll, Typing } from "@/components";
import style from "@/styles/sections/landing.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface componentProps {
  active: boolean,
  onFinished: Function
}

const landing = (props: componentProps) => {
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel1Stroke1Ref = useRef<HTMLDivElement>(null);
  const panel1Stroke2Ref = useRef<HTMLDivElement>(null);
  const panel1Stroke3Ref = useRef<HTMLDivElement>(null);

  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel2Stroke1Ref = useRef<HTMLDivElement>(null);
  const panel2Stroke2Ref = useRef<HTMLDivElement>(null);

  const logoImageRef = useRef<HTMLImageElement>(null);

  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(1);

  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const logoImage: imageProps = {
    src: require('@/public/logo.svg'),
    alt: 'logoImage'
  }

  const animationStart = () => {
    if (currentPanelIndex === 1) {
      panel1Stroke1Ref.current?.classList.toggle(style.panel1Stroke1ToDown);
      panel1Stroke2Ref.current?.classList.toggle(style.panel1Stroke2ToUp);
      panel1Stroke3Ref.current?.classList.toggle(style.panel1Stroke3ToRight);
    }
    else if (currentPanelIndex === 2) {
      panel2Stroke1Ref.current?.classList.toggle(style.panel2Stroke1ToUp);
      panel2Stroke2Ref.current?.classList.toggle(style.panel2Stroke2ToRight);
    }
  }

  const next = () => {
    setTimeout(() => setCurrentPanelIndex(currentPanelIndex + 1), 250);
  }

  const logoImagePhaseOut = () => {
    if (logoImageRef.current?.classList.contains(style.logoImagePhaseOut)) {
      next();
    }
    else {
      logoImageRef.current?.classList.toggle(style.logoImagePhaseOut);
    }
  }

  const moveToNextSection = () => {
    if (!props.active) return;

    setTimeout(() => props.onFinished('down'), 750);
  }

  useEffect(() => {
    if (currentPanelIndex === 4) {
      setTimeout(next, 750);
    }
    else if (currentPanelIndex === 5) {
      logoImageRef.current?.classList.toggle(style.logoImageCloseOut);
    }
  }, [currentPanelIndex]);

  return (
    <>
      <div className={`${style.backgroundNormal} ${currentPanelIndex >= 4 && style.backgroundBlack}`}></div>
      <div
        className={`${style.panel} ${currentPanelIndex === 1 && style.active}`}
        ref={panel1Ref}
      >
        <div className={style.panel1Stroke1} ref={panel1Stroke1Ref}></div>
        <div className={style.panel1Stroke2} ref={panel1Stroke2Ref}></div>
        <div className={style.panel1Stroke3} ref={panel1Stroke3Ref}></div>
        <Typing
          disabled={currentPanelIndex !== 1}
          onAnimationStart={animationStart}
          onAnimationEnd={next}
          closeOut
        >지금은</Typing>
      </div>
      <div
        className={`${style.panel} ${currentPanelIndex === 2 && style.active}`}
        ref={panel2Ref}
      >
        <div className={style.panel2Stroke1} ref={panel2Stroke1Ref}></div>
        <div className={style.panel2Stroke2} ref={panel2Stroke2Ref}></div>
        <Typing
          disabled={currentPanelIndex !== 2}
          onAnimationStart={animationStart}
          onAnimationEnd={next}
          closeOut
        >새로운 날개를</Typing>
      </div>
      <div className={`${style.panel} ${currentPanelIndex === 3 && style.active}`}>
        <Typing
          disabled={currentPanelIndex !== 3}
          onFinished={next}
          ritardando
        >달아줘야 할 때.</Typing>
      </div>
      <div className={`${style.panel} ${currentPanelIndex === 5 && style.active}`}>
        <Image
          className={style.logoImage}
          ref={logoImageRef}
          src={logoImage.src}
          alt={logoImage.alt}
          onAnimationEnd={logoImagePhaseOut}
          priority
        ></Image>
      </div>
      <div className={`${style.panel} ${currentPanelIndex === 6 && style.active}`}>
        <div className={style.text}>
          <h1 className={style.introduce}>의류 부자재의 새로운 혁신</h1>
          <div className={style.line} />
          <h1 className={style.company} onAnimationEnd={moveToNextSection}>대양ING</h1>
        </div>
      </div>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default landing;