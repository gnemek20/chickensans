import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Background, Content, ContentChild, EmphasizeScroll } from "../components";
import style from "@/styles/sections/main.module.css";
import Image from "next/image";

interface componentProps {
  moveToLastSection: Function
}

const main = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public/images/jean.jpg'),
    alt: 'backgroundImage'
  }

  const logoImage: imageProps = {
    src: require('@/public/subLogo.png'),
    alt: 'logoImage'
  }

  return (
    <>
      <Background
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      >
      </Background>
      <Content>
        <ContentChild>
          <h1>지퍼와 단추</h1>
          <h1>제작을</h1>
          <h1>고민 중일 때</h1>
          <div
            className={style.contact}
          >
            <p>망설이지 말고</p>
            <button
              onClick={() => props.moveToLastSection()}
            >
              연락하기
            </button>
          </div>
        </ContentChild>
        <ContentChild>
          <Image
            src={logoImage.src}
            alt={logoImage.alt}
          ></Image>
        </ContentChild>
      </Content>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default main;