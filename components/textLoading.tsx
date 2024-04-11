import style from "@/styles/components/textLoading.module.css";
import { useEffect, useState } from "react";

interface componentProps {
  active: boolean
}

const textLoading = (props: componentProps) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (props.active) {
      setTimeout(() => {
        const textLength = text.replace(/ /g, '').length;

        if (textLength === 0) setText('.');
        else if (textLength === 1) setText('. .');
        else if (textLength === 2) setText('. . .');
        else if (textLength === 3) setText('');
      }, 500);
    }
  }, [props.active, text]);

  return (
    <h1 className={style.text}>{ text }</h1>
  )
}

export default textLoading;