import style from "@/styles/Home.module.css";
import { Button, Company, Contact, Landing, Map, Zipper } from "@/sections";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components";

export default function Home() {
  type direction = 'up' | 'down' | 'resize';

  interface componentProps {
    active: boolean,
    onFinished: Function,
    lockMoveSection: Function
  }

  const containerRef = useRef<HTMLDivElement>(null);

  const sectionList: Array<(props: componentProps) => JSX.Element> = [
    Landing,
    Zipper,
    Button,
    Company,
    Map,
    Contact
  ]

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
    
    setIsMoving(true);
    moveSection(pageHeight, nextSectionNumber, direction);
  }
  const moveSection = (pageHeight: number, index: number, direction: direction) => {
    if (containerRef.current?.classList.contains(style.fadeOut)) return;

    if (index === lastSectionNumber) {
      if (direction !== 'resize') {
        containerRef.current?.classList.remove(style.fadeIn);
        containerRef.current?.classList.toggle(style.fadeOut);
      }
      else {
        window.scrollTo({ top: document.body.scrollHeight });
      }
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight });
        containerRef.current?.style.setProperty('transform', `translateY(0px)`);
      }, 250);
      setTimeout(() => {
        if (direction !== 'resize') {
          containerRef.current?.classList.remove(style.fadeOut);
          containerRef.current?.classList.toggle(style.fadeIn);
        }
        setCurrentSectionNumber(index);
      }, 700);
    }
    else if (index === lastSectionNumber - 1 && direction === 'up') {
      containerRef.current?.classList.remove(style.fadeIn);
      containerRef.current?.classList.toggle(style.fadeOut);

      setTimeout(() => {
        window.scrollTo({ top: 0 });
        const section = pageHeight * index;
        containerRef.current?.style.setProperty('transform', `translateY(-${section}px)`);
      }, 250);
      setTimeout(() => {
        containerRef.current?.classList.remove(style.fadeOut);
        containerRef.current?.classList.toggle(style.fadeIn);
        setCurrentSectionNumber(index);
      }, 700);
    }
    else {
      const section = pageHeight * index;
      containerRef.current?.style.setProperty('transform', `translateY(-${section}px)`);
      setCurrentSectionNumber(index);
    }
  }

  const changeIsMovingStatus = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current) setIsMoving(false);
  }

  const lockMoveSection = (status: boolean) => {
    setIsMovingLocked(status);
  }

  const resizePageHeight = () => {
    const pageHeight = window.innerHeight;

    setPageHeight(pageHeight);
  }

  useEffect(() => {
    moveSection(pageHeight, currentSectionNumber, 'resize');
  }, [pageHeight]);

  useEffect(() => {
    history.scrollRestoration = "manual";

    window.addEventListener('resize', resizePageHeight);
    resizePageHeight();
  }, []);

  return (
    <>
      <Sidebar activedSection={currentSectionNumber}></Sidebar>
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
