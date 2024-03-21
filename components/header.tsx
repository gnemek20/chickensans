import style from '@/styles/header.module.css';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

const header = () => {
  interface imageProps {
    src: StaticImport,
    alt: string
  }

  const logoImage: imageProps = {
    src: require('@/public/logo.png'),
    alt: 'logoImage'
  }
  
  return (
    <div
      className={style.container}
    >
      <Image
        className={style.logo}
        src={logoImage.src}
        alt={logoImage.alt}
      ></Image>
    </div>
  )
}

export default header;