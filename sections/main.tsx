import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { BackgroundBackup, Content, ContentChild, EmphasizeScroll, Header } from "../components";
import style from "@/styles/sections/main.module.css";
import animation from "@/styles/animation.module.css";
import Image from "next/image";

interface componentProps {
  active?: boolean,
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
      <Header></Header>
      <BackgroundBackup
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      >
      </BackgroundBackup>
      <Content>
        <ContentChild>
          <h1>지퍼와 단추</h1>
          <h1>제작을</h1>
          <h1>고민 중일 때</h1>
          <div
            className={style.contact}
          >
            <h2>망설이지 말고</h2>
            <button
              onClick={() => props.moveToLastSection()}
            >
              연락하기
            </button>
          </div>
        </ContentChild>
        <ContentChild>
          <Image
            className={`${props.active && animation.slide}`}
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