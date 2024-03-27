import style from "@/styles/components/cursor.module.css";
import { useEffect, useRef } from "react";

interface componentProps {
  disabled: boolean
}

const cursor = (props: componentProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const blink = () => {
    cursorRef.current?.classList.toggle(style.active);
  }

  useEffect(() => {
    if (props.disabled) return;

    const interval = setInterval(blink, 750);
    setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
    }
  }, [props.disabled]);
  
  return (
    <div
      className={style.cursor}
      ref={cursorRef}
    ></div>
  )
}

export default cursor;