import { Background, Blur, DivideLayer, EmphasizeProduct, Footer, Mask, NecessaryText, Notifier, TextLoading } from "@/components";
import style from "@/styles/sections/contact.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface componentProps {
  active: boolean,
  lockMoveSection: Function
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
  const formAreaRef = useRef<HTMLTextAreaElement>(null);

  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState<boolean>(false);
  const [isProductNameShowing, setIsProductNameShowing] = useState<boolean>(false);

  const [isCompletedPost, setIsCompletedPost] = useState<boolean>(false);

  const eraseMask = () => {
    maskAnimation();
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
    setStartBlurAnimation(true);
  }

  const lockMoveSection = (status: boolean) => {
    if (formAreaRef.current?.scrollTop === 0) {
      props.lockMoveSection(false);
    }
    else {
      props.lockMoveSection(status);
    }
  }

  useEffect(() => {
    if (isProductNameShowing) {
      setTimeout(eraseMask, 850);
    }
  }, [isProductNameShowing]);

  useEffect(() => {
    if (!props.active) {
      props.lockMoveSection(false);
    }
  }, [props.active]);

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
          <DivideLayer top percent={90}></DivideLayer>
          <EmphasizeProduct>
            <h1>주문 등록</h1>
            <p>최대한 빨리 확인하여 기재해주신 연락처로 연락드리겠습니다.</p>
          </EmphasizeProduct>
          <div className={style.contactForm}>
            <div>
              <NecessaryText>이름</NecessaryText>
              <input type="text" placeholder="Ex. 홍길동" />
            </div>
            <div>
              <NecessaryText>연락처</NecessaryText>
              <input type="text" placeholder="Ex. email@example.com / 010-XXXX-..." />
            </div>
            <div>
              <p>주문 내용</p>
              <textarea
                ref={formAreaRef}
                rows={10}
                placeholder="자유롭게 내용을 입력해주세요."
                spellCheck={false}
                onTouchStart={() => lockMoveSection(true)}
                onTouchEnd={() => lockMoveSection(false)}
                onScroll={() => lockMoveSection(true)}
                onMouseLeave={() => lockMoveSection(false)}
              ></textarea>
            </div>
            <button className={style.formSubmit} onClick={() => setIsCompletedPost(!isCompletedPost)}>등록하기</button>
          </div>
        </Blur>
      </Background>
      <Notifier isShowing={isCompletedPost}>등록되었습니다.</Notifier>
      <Footer componentRef={footerRef}></Footer>
    </>
  )
}

export default contact;