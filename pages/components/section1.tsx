import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Background, Content, ContentChild, EmphasizeScroll } from ".";
import Image from "next/image";
import style from "@/styles/section1.module.css";

const section1 = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public/images/jean.jpg'),
    alt: 'backgroundImage'
  }

  const logoImage: imageProps = {
    src: require('@/public/logo.png'),
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
          <h1>고민중일때!</h1>
          <p>배고프다</p>
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

export default section1;