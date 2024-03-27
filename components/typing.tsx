import style from "@/styles/components/typing.module.css";
import { useEffect, useRef, useState } from "react";
import { Cursor } from ".";

interface componentProps {
  disabled: boolean,
  closeOut?: boolean,
  ritardando?: boolean,
  children: string,
  onAnimationStart?: Function,
  onAnimationEnd?: Function,
  onFinished?: Function
}

const typing = (props: componentProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  const text: string = props.children;
  const [splitedText, setSplitedText] = useState<Array<string>>(text.split(''));
  const [showingText, setShowingText] = useState<string>('');

  const insert = () => {
    setSplitedText(splitedText.slice(1));
    setShowingText([showingText, splitedText.shift()].join(''));
  }

  useEffect(() => {
    if (props.disabled) return

    if (splitedText.length > 0) {
      let timer = 150;
      if (props.ritardando && splitedText.length < 6) timer = 115 * (6 - splitedText.length);

      setTimeout(insert, timer);
    }
    else {
      if (props.closeOut) textRef.current?.classList.toggle(style.animation);
      else setTimeout(() => props.onFinished ? props.onFinished() : {}, 250);
    }
  }, [splitedText, props.disabled]);

  return (
    <div
      className={style.text}
      ref={textRef}
      onAnimationStart={() => props.onAnimationStart ? props.onAnimationStart() : {}}
      onAnimationEnd={() => props.onAnimationEnd ? props.onAnimationEnd() : {}}
    >
      { showingText }
      <Cursor disabled={props.disabled}></Cursor>
    </div>
  )
}

export default typing;