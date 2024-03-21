import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Background, Content, EmphasizeScroll } from ".";
import style from "@/styles/section1.module.css";

const section1 = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require("@/public/next.svg"),
    alt: "backgroundImage"
  }

  return (
    <>
      <Background
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      >
      </Background>
      <Content>
        <p>section 1</p>
        <p>chicks</p>
      </Content>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default section1;