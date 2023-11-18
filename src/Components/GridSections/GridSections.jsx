import './GridSections.scss'

export default function GridSections({children , style}) {
  return (
    <div style={style} className='GridSections'>
        {children}
    </div>
  )
}
