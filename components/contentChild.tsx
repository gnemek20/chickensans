import style from '@/styles/components/contentChild.module.css';
import { ReactNode } from 'react';

interface componentProps {
  children?: ReactNode
}

const contentChild = (props: componentProps) => {
  return (
    <div
      className={style.container}
    >
      { props.children?? props.children }
    </div>
  )
}

export default contentChild;