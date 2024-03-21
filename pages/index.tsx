import style from "@/styles/Home.module.css";
import { Section1, Section2 } from "./components";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  type direction = 'up' | 'down';

  const containerRef = useRef<HTMLDivElement>(null);

  const sectionList: Array<() => JSX.Element> = [
    Section1,
    Section2
  ]

  const [pageHeight, setPageHeight] = useState<number>(0);

  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [currentSectionNumber, setCurrentSectionNumber] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const classifyWheelDirection = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) changeSection('down');
    else if (event.deltaY < 0) changeSection('up');
  }
  const recordTouchedY = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(event.touches[0].clientY);
  }
  const classifyDragDirection = (event: React.TouchEvent<HTMLDivElement>) => {
    const offset: number = 50;
    const movedTouchY: number = event.touches[0].clientY;

    if (touchStartY > (movedTouchY + offset)) changeSection('down');
    else if (touchStartY < (movedTouchY - offset)) changeSection('up');
  }
  const changeSection = (direction: direction) => {
    if (isMoving) return;

    const firstSectionNumber: number = 0;
    const lastSectionNumber: number = sectionList.length - 1;
    let nextSectionNumber: number = firstSectionNumber;
    
    if (direction === 'up') {
      if (currentSectionNumber === firstSectionNumber) return;
      nextSectionNumber = currentSectionNumber - 1;
    }
    else if (direction === 'down') {
      if (currentSectionNumber === lastSectionNumber) return;
      nextSectionNumber = currentSectionNumber + 1;
    }
    
    moveSection(pageHeight, nextSectionNumber);
    setIsMoving(true);
    setCurrentSectionNumber(nextSectionNumber);
  }
  const moveSection = (height: number, index: number) => {
    const section = height * index;
    containerRef.current?.style.setProperty('transform', `translateY(-${section}px)`);
  }

  const resizePageHeight = () => {
    const pageHeight = window.innerHeight;
    setPageHeight(pageHeight);
  }

  useEffect(() => {
    moveSection(pageHeight, currentSectionNumber);
  }, [pageHeight]);

  useEffect(() => {
    history.scrollRestoration = "manual";

    window.addEventListener('resize', resizePageHeight);
    resizePageHeight();
  }, []);

  return (
    <>
      <div
        className={style.sidebar}
      >
        {/* 스크롤바 컴포넌트 제작 */}
      </div>
      <div
        className={style.container}
        ref={containerRef}
        onTouchStart={recordTouchedY}
        onTouchMove={classifyDragDirection}
        onWheel={classifyWheelDirection}
        onTransitionEnd={() => setIsMoving(false)}
      >
        {
          sectionList.map((Section, index) => (
            <div
              className={style.section}
              key={index}
              style={{
                height: pageHeight !== 0 ? pageHeight : '100vh'
              }}
            >
              <Section />
            </div>
          ))
        }
      </div>
    </>
  );
}
