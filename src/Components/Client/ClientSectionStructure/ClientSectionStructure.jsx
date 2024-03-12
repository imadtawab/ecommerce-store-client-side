import './ClientSectionStructure.scss'

export default function ClientSectionStructure({keyy , subTitle, title , children, description}) {
  return (
    <div key={keyy} className='ClientSectionStructure'>
        <div className="head">
            <h5>{subTitle}</h5>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
        </div>
        {children && (
                  <div className="content">
                  {children}
              </div>
        )}
    </div>
  )
}
