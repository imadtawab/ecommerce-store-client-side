import './Alert.scss'
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
// import ReactDOM from 'react-dom'

// ReactDOM.render(<Alert/> , document.getElementById("alertRender"))

export default function Alert({type , children}) {
  // type : success , danger
  // children
  return (
    <div className={`Alert ${type ? type : ""}`}>
        <div className="content">
            <div className="icon">
                {type === "danger" ? <BsXCircleFill/> : <BsFillCheckCircleFill/>}
            </div>
            <div className="message">{children}</div>
        </div>
    </div>
  )
}
