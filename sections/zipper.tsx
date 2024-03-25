import { Background, Content, ContentChild, EmphasizeScroll, Header } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import style from "@/styles/sections/zipper.module.css";

const zipper = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public/images/zipper.jpg'),
    alt: 'backgroundImage'
  }

  const zipperIcon: imageProps = {
    src: require('@/public/icons/zipper.svg'),
    alt: 'zipperIcon'
  }

  return (
    <>
      <Header></Header>
      <Background
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></Background>
      <Content>
        <ContentChild>
          <h1>상상하는 그대로</h1>
          <h1>맞춤형 지퍼</h1>
          <div
            className={style.sub}
          >
            <h2>코일, 메탈, 플라스틱 등</h2>
            <h2>다양한 형태를 지원합니다.</h2>
          </div>
          <h2></h2>
        </ContentChild>
        <ContentChild>
          <Image
            className={style.icon}
            src={zipperIcon.src}
            alt={zipperIcon.alt}
          ></Image>
        </ContentChild>
      </Content>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default zipper;