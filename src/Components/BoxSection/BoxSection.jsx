import './BoxSection.scss'

export default function BoxSection({type,icon, title, value, status, onClick, active}) {
  // type : BoxSection2
  return (
    <div key={status+title+value} onClick={onClick} className={`${type ? type : "BoxSection"} ${status ? " statustrue " + status : ""} ${active ? "active" : ""}`}>
        <div className="icon">
            {icon}
        </div>
        <div className="content">
            <h4>{title}</h4>
            {value.type ? (
                <p>{value.amount}<span>{value.type}</span></p>
            ) : (
              <p>{value}</p>
            )}
        </div>
    </div>
  )
}


