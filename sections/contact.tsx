import { Background, Content, ContentChild, Footer } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/sections/contact.module.css";
import { useRef } from "react";

interface componentProps {
  isMobile: boolean
}

const contact = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public//images/contact.jpg'),
    alt: 'backgroundImage'
  }

  const telephoneIcon: imageProps = {
    src: require('@/public/icons/telephone.svg'),
    alt: 'telephoneIcon'
  }

  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Background
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></Background>
      <Content>
        <ContentChild>
          <h1>언제든</h1>
          <h1>환영합니다</h1>
          <div
            className={style.container}
          >
            <div
              className="flex"
              >
              <h2
                className={style.wrapper}
                onClick={() => props.isMobile ? window.open('tel:010-3744-3084', '_self') : null}
              >
                TEL: 010-3744-3084
              </h2>
            </div>
            <div
              className="flex"
            >
              <h2
                className={style.wrapper}
                onClick={() => window.open('https://open.kakao.com/o/sgqi929f')}
              >
                KAKAO: 채팅방
              </h2>
            </div>
          </div>
        </ContentChild>
        <ContentChild>
          <Image
            className={style.icon}
            src={telephoneIcon.src}
            alt={telephoneIcon.alt}
          ></Image>
        </ContentChild>
      </Content>
      <Footer
        componentRef={footerRef}
      ></Footer>
    </>
  )
}

export default contact;