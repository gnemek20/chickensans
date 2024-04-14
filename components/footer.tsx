import style from "@/styles/components/footer.module.css";
import { RefObject, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface componentProps {
  componentRef: RefObject<HTMLDivElement>
}

const footer = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const arrowImage: imageProps = {
    src: require('@/public/icons/arrow.svg'),
    alt: 'arrowImage'
  }

  const [isFooterShowing, setIsFooterShowing] = useState<boolean>(false);

  const pullFooter = (pull: 'up' | 'down' | 'reverse') => {
    const footerShowing = pull === 'up' ? false : pull === 'down' ? true : !isFooterShowing;

    if (footerShowing) {
      props.componentRef.current?.style.setProperty('transform', 'translateY(100%)');
    }
    else {
      props.componentRef.current?.style.setProperty('transform', 'translateY(0)');
    }

    setIsFooterShowing(footerShowing);
  }

  return (
    <div
      className={style.footer}
      ref={props.componentRef}
      onMouseLeave={() => pullFooter('down')}
    >
      <div
        className={style.pullButton}
        onClick={() => pullFooter('reverse')}
        onMouseEnter={() => pullFooter('up')}
        style={{cursor: 'pointer'}}
      >
        <Image
          className={`${isFooterShowing ? style.directionDown : style.directionUp}`}
          src={arrowImage.src}
          alt={arrowImage.alt}
        ></Image>
      </div>
      <div
        className={style.container}
      >
        <div
          className={style.wrapper}
        >
          <p>대양ING</p>
          <p>서울특별시 종로구 김상옥로 59, 한아빌딩 3층</p>
          <div
            className={style.information}
          >
            <div>
              <p>사업자번호: 123-45-67890</p>
              <p>통신판매업: 서울 치킨-1234</p>
            </div>
            <div>
              <p>전화번호: 010-3744-3084</p>
              <p>이메일: example@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default footer;