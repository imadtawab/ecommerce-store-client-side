import { NavLink } from 'react-router-dom'
import './Btn.scss'
import CercleLoading from '../CercleLoading/CercleLoading'

export default function Btn({children ,element,to, type , onClick , btnStyle , color ,width, loading, style, disabled , htmlFor}) {
    // children
    // element = a || button || div || label
    // to = href
    // type = for button
    // onClick = function()
    // btnStyle = outline || bg
    // color = danger || success || primary
    // style
  return (
    <div className={`Btn ${btnStyle ? btnStyle : ''} ${color ? color : ""} ${width === "full" ? "width-full" : ''}`}>
        {element === "a" && (
            <NavLink onClick={onClick} to={to}>{children}</NavLink>
        )}
        {element === "button" && (
            <button style={style} disabled={loading || disabled} onClick={onClick} type={type? type : ""}>
              {loading ? <CercleLoading type="btn"/> : children}
            </button>
        )}
        {element === "div" && (
            <div className={loading ? "disabled" : ""} onClick={onClick}>
              {loading ? <CercleLoading type="btn"/> : children}
            </div>
            
        )}
        {element === "label" && (
        <label htmlFor={htmlFor} className={loading ? "disabled" : ""} onClick={onClick}>
        {loading ? <CercleLoading type="btn"/> : children}
        </label>

)}
    </div>
    
  )
}
