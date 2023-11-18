import Btn from "../Btn/Btn"
import "./PageStructure.scss"
import { NavLink } from 'react-router-dom'


export default function PageStructure({children , title , button}) {
    // children = content
    // title = h1
    // button = {type, href, name}
  return (
    <div className="PageStructure">
        <div className="head">
            <h1>{title}</h1>
            {button && (
               <Btn onClick={button.onClick} color="success" btnStyle="bg" element={button.type ? button.type : "a"} to={button.href}> {button.icon ? <div className="icon">{button.icon}</div> : ""} {button.name}</Btn>
            )}
        </div>
        {children}
    </div>
  )
}
