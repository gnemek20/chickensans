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
    Map,
    Contact
  ]

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);

  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [currentSectionNumber, setCurrentSectionNumber] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isMovingLocked, setIsMovingLocked] = useState<boolean>(false);

  const firstSectionNumber: number = 0;
  const lastSectionNumber: number = sectionList.length - 1;

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
    if (isMobile && index === lastSectionNumber) {
      document.body.style.setProperty('overflow-y', 'scroll');
      document.body.style.setProperty('touch-action', 'auto');
      
      window.scrollTo(0, document.body.scrollHeight);
      containerRef.current?.style.setProperty('transform', `translateY(0)`);
    }
    else {
      document.body.style.setProperty('overflow-y', 'hidden');
      document.body.style.setProperty('touch-action', 'none');
      
      const section = height * index;
      containerRef.current?.style.setProperty('transform', `translateY(-${section}px)`);
      window.scrollTo(0, 0);
    }

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

    setIsMobile(navigator.userAgent.toLowerCase().includes('iphone') || navigator.userAgent.toLowerCase().includes('android'));
  }, []);

  return (
    <>
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
