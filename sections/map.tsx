import { Background, Blur, DivideLayer, EmphasizeProduct, EmphasizeScroll, Mask, ProductName } from "@/components";
import style from "@/styles/sections/map.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface componentProps {
  active: boolean,
  lockMoveSection: Function
}

const map = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const boardIcon: imageProps = {
    src: require('@/public/icons/map.svg'),
    alt: 'mapIcon'
  }
  const placeholderIcon: imageProps = {
    src: require('@/public/icons/placeholder.svg'),
    alt: 'placeholderIcon'
  }

  const boardRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const productNameRef = useRef<HTMLDivElement>(null);

  const map = useRef<Element | any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [maskActive, setMaskActive] = useState<boolean>(false);
  const [startMaskAnimation, setStartMaskAnimation] = useState<boolean>(false);

  const [isCoverShowing, setIsCoverShowing] = useState<boolean>(true);
  const [isCoverClicked, setIsCoverClicked] = useState<boolean>(false);

  const eraseMask = () => {
    setTimeout(maskAnimation, 700);
  }
  const maskAnimation = () => {
    setStartMaskAnimation(true);
  }

  const resizeMapIcon = () => {
    setTimeout(reduceSizeMapIcon, 250);
  }
  const reduceSizeMapIcon = () => {
    boardRef.current?.classList.toggle(style.resizeBoard);
    placeholderRef.current?.classList.toggle(style.resizePlaceholder);
    productNameRef.current?.classList.toggle(style.slideInProductName);
  }
  const startMapIconAnimation = () => {
    if (!(boardRef.current?.classList.contains(style.hoverBoard) || placeholderRef.current?.classList.contains(style.hoverPlaceholder))) {
      boardRef.current?.classList.toggle(style.hoverBoard);
      placeholderRef.current?.classList.toggle(style.hoverPlaceholder);
    }
  }

  useEffect(() => {
    if (props.active) setMaskActive(true);
  }, [props.active]);

  useEffect(() => {
    const dy_location: { latitude: number, longtitude: number } = {
      latitude: 37.57360,
      longtitude: 127.00450
    }

    map.current = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(dy_location.latitude, dy_location.longtitude),
      zoom: 15
    });
    new naver.maps.Marker({
      position: new naver.maps.LatLng(dy_location.latitude, dy_location.longtitude),
      map: map.current
    });
  }, []);

  return (
    <>
      <Mask maskActive={maskActive} startMaskAnimation={startMaskAnimation}>
        <div className={style.mapIcon}>
          <Image
            className={style.board}
            ref={boardRef}
            src={boardIcon.src}
            alt={boardIcon.alt}
            onAnimationEnd={resizeMapIcon}
            onTransitionEnd={startMapIconAnimation}
          ></Image>
          <Image
            className={style.placeholder}
            ref={placeholderRef}
            src={placeholderIcon.src}
            alt={placeholderIcon.alt}
          ></Image>
        </div>
        <ProductName
          className={style.productName}
          componentRef={productNameRef}
          onAnimationEnd={eraseMask}
        >
          <h1>Map</h1>
        </ProductName>
      </Mask>
      <Background white>
        <EmphasizeProduct>
          <h1>찾아오시는 길</h1>
          <p>서울특별시 종로구 김상옥로 59, 한아빌딩 3층</p>
        </EmphasizeProduct>
        <DivideLayer></DivideLayer>
        <div className={style.introduce}>
          <div className={style.mapShadow}></div>
          <div
            className={style.map}
            id="map"
            ref={mapRef}
            onTouchStart={() => props.lockMoveSection(true)}
            onTouchEnd={() => props.lockMoveSection(false)}
          ></div>
          <div className={style.mapCover}></div>
        </div>
      </Background>
      <EmphasizeScroll black></EmphasizeScroll>
    </>
  )
}

export default map;