import { Background, Blur, DivideLayer, Footer, Mask } from "@/components";
import style from "@/styles/sections/contact.module.css";
import { useRef } from "react";

const contact = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Mask maskActive startMaskAnimation>

      </Mask>
      <Background white>
        <Blur startBlurAnimation>
          <DivideLayer top></DivideLayer>
        </Blur>
      </Background>
      <Footer componentRef={footerRef}></Footer>
    </>
  )
}

export default contact;