import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Background, Content } from ".";
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
    </>
  )
}

export default section1;