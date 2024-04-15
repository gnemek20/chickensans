import style from "@/styles/components/sidebar.module.css";

interface componentProps {
  activedSection: number
}

const sidebar = (props: componentProps) => {
  const sectionList: Array<string> = Object.keys(require('@/sections'));

  return (
    <>
      <div className={style.list}>
        {
          sectionList.map((section, index) => (
            <div className={`${style.section} ${props.activedSection === index && style.active}`} key={index}></div>
          ))
        }
      </div>
    </>
  )
}

export default sidebar;