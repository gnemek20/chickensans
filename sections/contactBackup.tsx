import { Background, BackgroundBackup, Content, ContentChild, Footer, Header, Notifier } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/sections/contactBackup.module.css";
import { useRef, useState } from "react";
import animation from "@/styles/animation.module.css";

interface componentProps {
  isMobile: boolean,
  active?: boolean
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

  const [isNotifierShowing, setIsNotifierShowing] = useState<boolean>(false);

  const telNumber: string = '010-3744-3084';
  const kakaoLink: string = 'https://open.kakao.com/o/sgqi929f';
  const emailAddr: string = 'example@gmail.com';

  const copyEmailAddr = () => {
    if (isNotifierShowing) return;

    navigator.clipboard.writeText(`${emailAddr}`);
    setIsNotifierShowing(true);
  }


  return (
    <>
      <Header></Header>
      <Notifier
        isShowing={isNotifierShowing}
        onAnimationEnd={setIsNotifierShowing}
      >
        복사 완료
      </Notifier>
      <BackgroundBackup
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></BackgroundBackup>
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
                onClick={() => props.isMobile ? window.open(`tel:${telNumber}`, '_self') : null}
              >
                TEL: { telNumber }
              </h2>
            </div>
            <div
              className="flex"
            >
              <h2
                className={style.wrapper}
                onClick={() => window.open(`${kakaoLink}`)}
              >
                KAKAO: 오픈채팅방
              </h2>
            </div>
            <div
              className="flex"
            >
              <h2
                className={style.wrapper}
                onClick={copyEmailAddr}
              >
                EMAIL: { emailAddr }
              </h2>
            </div>
          </div>
        </ContentChild>
        <ContentChild>
          <Image
            className={`${style.icon} ${props.active && animation.ringing}`}
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