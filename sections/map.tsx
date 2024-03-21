import { Background, Content, ContentChild } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef } from "react";

const map = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const mapRef = useRef<HTMLElement | any>(null);

  const backgroundImage: imageProps = {
    src: require('@/public/images/tshirt.jpg'),
    alt: 'backgroundImage'
  }

  useEffect(() => {
    const dy_location: { latitude: number, longtitude: number } = {
      latitude: 37.57360,
      longtitude: 127.00450
    }

    mapRef.current = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(dy_location.latitude, dy_location.longtitude),
      zoomControl: true,
      zoom: 15
    });
    new naver.maps.Marker({
      position: new naver.maps.LatLng(dy_location.latitude, dy_location.longtitude),
      map: mapRef.current
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
        </ContentChild>
        <ContentChild>
          <div id="map"></div>
        </ContentChild>
      </Content>
    </>
  )
}

export default map;