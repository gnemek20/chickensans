import style from "@/styles/Home.module.css";
import { Header } from "@/components";
import { Button, Contact, Landing, Main, Map, MapBackup, Zipper } from "@/sections";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  type direction = 'up' | 'down';

  interface componentProps {
    // moveToLastSection: Function,
    // changeIsMovingLockedStatus: Function,
    // isMobile: boolean,
    // active: boolean
    active: boolean,
    onFinished: Function,
    lockMoveSection: Function
  }

  const containerRef = useRef<HTMLDivElement>(null);

  const sectionList: Array<(props: componentProps) => JSX.Element> = [
    // Main,
    // Zipper,
    // Map,
    // Contact
    Landing,
    Zipper,
    Button,
    Map
  ]

  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);

  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [currentSectionNumber, setCurrentSectionNumber] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isMovingLocked, setIsMovingLocked] = useState<boolean>(false);

  const classifyWheelDirection = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) changeSection('down');
    else if (event.deltaY < 0) changeSection('up');
  }
  const recordTouchedY = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(event.touches[0].clientY);
  }
  const classifyDragDirection = (event: React.TouchEvent<HTMLDivElement>) => {
    const offset: number = 25;
    const movedTouchY: number = event.touches[0].clientY;

    if (touchStartY > (movedTouchY + offset)) changeSection('down');
    else if (touchStartY < (movedTouchY - offset)) changeSection('up');
  }
  const changeSection = (direction: direction) => {
    if (isMoving || isMovingLocked) return;

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
  const moveToLastSection = () => {
    const lastSectionIndex: number = sectionList.length - 1;
    const section: number = pageHeight * lastSectionIndex;
    containerRef.current?.style.setProperty('transform', `translateY(-${section}px)`);
    setCurrentSectionNumber(lastSectionIndex);
  }

  const changeIsMovingStatus = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current) setIsMoving(false);
  }

  const lockMoveSection = (status: boolean) => {
    setIsMovingLocked(status);
  }

  const resizePageHeight = () => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    setPageWidth(pageWidth);
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
      <div className={style.sidebar}>
        {/* 스크롤바 컴포넌트 제작 */}
      </div>
      <div
        className={style.container}
        ref={containerRef}
        onTouchStart={recordTouchedY}
        onTouchMove={classifyDragDirection}
        onWheel={classifyWheelDirection}
        onTransitionEnd={(event) => changeIsMovingStatus(event)}
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
              <Section
                active={currentSectionNumber === index}
                onFinished={changeSection}
                lockMoveSection={lockMoveSection}
              />
            </div>
          ))
        }
      </div>
    </>
  );
}
