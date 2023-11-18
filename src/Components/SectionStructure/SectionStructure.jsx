import './SectionStructure.scss'

export default function SectionStructure({children , title ,bg ,pd,controlls , flex,style}) {
    // children = content
    // title
    // bg = grey
    // pd = "none" || 
  return (
    <div style={{flex : flex ? flex : "",...style}} className={`SectionStructure ${bg==="grey" ? " grey" : ""} ${pd==="none" ? "pd-none" : ""}`}>
        {(title && !controlls) && (
            <h3>{title}</h3>
        )}
        {controlls &&
            (<div className='Controlls-sett'>
              {title && (
            <h3>{title}</h3>
              )}
              {controlls}
            </div>)
        }
        {children}
    </div>
  )
}
