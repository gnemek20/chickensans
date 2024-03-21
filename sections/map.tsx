import { Background, Content, ContentChild } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import style from "@/styles/sections/map.module.css";

const map = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const map = useRef<Element | any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [isMapOpened, setIsMapOpened] = useState<boolean>(false);

  const backgroundImage: imageProps = {
    src: require('@/public/images/tshirt.jpg'),
    alt: 'backgroundImage'
  }
  
  useEffect(() => {
    if (isMapOpened) {
      mapRef.current?.style.setProperty('border-color', 'white');
      mapRef.current?.style.setProperty('height', '100%');
    }
    else {
      mapRef.current?.style.setProperty('border-color', 'transparent');
      mapRef.current?.style.setProperty('height', '0');
    }
  }, [isMapOpened]);

  useEffect(() => {
    if (window.innerWidth >= 768) setIsMapOpened(true);

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
      <Background
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></Background>
      <Content>
        <ContentChild>
          <h1>이곳에서</h1>
          <h1>만들어요</h1>
          <div
            className={style.address}
          >
            <p>주소: 서울특별시 종로구 김상옥로 59, 한아빌딩 3층</p>
            <button
              onClick={() => setIsMapOpened(!isMapOpened)}
            >
              지도 { isMapOpened ? '닫기' : '열기' }
            </button>
          </div>
        </ContentChild>
        <ContentChild>
          <div
            className={style.map}
            id="map"
            ref={mapRef}
          ></div>
        </ContentChild>
      </Content>
    </>
  )
}

export default map;