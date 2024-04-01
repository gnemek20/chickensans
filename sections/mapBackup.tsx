import { Background, BackgroundBackup, Content, ContentChild, EmphasizeScroll, Header } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import style from "@/styles/sections/mapBackup.module.css";

interface componentProps {
  changeIsMovingLockedStatus: Function
}

const map = (props: componentProps) => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const map = useRef<Element | any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [isMapOpened, setIsMapOpened] = useState<boolean>(false);

  const addressUrl = 'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EA%B9%80%EC%83%81%EC%98%A5%EB%A1%9C%2059/address/14138072.9066057,4519365.2427951,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EA%B9%80%EC%83%81%EC%98%A5%EB%A1%9C%2059,new?searchType=address&isCorrectAnswer=true&c=18.25,0,0,0,dh';

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
    setIsMapOpened(true);

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
      <Header></Header>
      <BackgroundBackup
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></BackgroundBackup>
      <Content>
        <ContentChild>
          <h1>회사는</h1>
          <h1>여기에 있어요</h1>
          <div
            className={style.address}
          >
            <div className="flex">
              <p
                className={style.url}
                onClick={() => window.open(addressUrl)}
              >
                주소: 서울특별시 종로구 김상옥로 59, 한아빌딩 3층
              </p>
            </div>
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
            onTouchStart={() => isMapOpened && props.changeIsMovingLockedStatus(true)}
            onTouchEnd={() => props.changeIsMovingLockedStatus(false)}
          ></div>
        </ContentChild>
      </Content>
      <EmphasizeScroll></EmphasizeScroll>
    </>
  )
}

export default map;