import { BsFillExclamationOctagonFill } from 'react-icons/bs'
import './InputBox.scss'
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";


export default function InputBox({checkValueInDB ,checkingMessage, error, type, name, id, placeholder, label , value , personelInput,onChange,required , mx_width , flex , pd , leftSlug , rightSlug , borderSlug , slugWrap}) {
    return (
      <div style={flex ? {flex: +flex} : {}} className={"InputBox" + (error ? " error" : "") + (mx_width ? " mx_width" : "") + (pd === "none" ? " pd-none" : "")}>
          {label && (
            <>
                <label htmlFor={id}>{label}{required && <div className="required">*</div>}</label>
              
              </>
          )}
          {personelInput ? (
            personelInput
          ) : (
            (leftSlug || rightSlug) ? (
              <>
              <div className={`input-slug${borderSlug === "none" ? " border-none" : ""}${slugWrap ? " slug-wrap" : ""}`}>
                {leftSlug && <span>{leftSlug}</span>}
                <input required={required ? true : false} onChange={onChange} value={value} placeholder={placeholder} type={type ? type : "text"} name={name} id={id} />
                {rightSlug && <label htmlFor={id}>{rightSlug}</label>}
              </div>
              {/* {console.log(checkValueInDB)} */}
              {(checkValueInDB && checkValueInDB.message) && (
                <div className="checking-message">
                  {/* {console.log(checkingMessage.pauseCheckingDuration , checkingMessage.isLoading)} */}
                {(checkValueInDB.pauseCheckingDuration ? checkValueInDB.pauseCheckingDuration : checkValueInDB.isLoading) ?
                  <div className="loading">Checking availability...</div> :
                  checkValueInDB.checking ? 
                    <div className="success"><FaCheckCircle/>{checkValueInDB.message}</div> :
                    <div className="error"><FaExclamationTriangle />{checkValueInDB.message}</div>
                    }
                </div>
              )}
              {error ? (
                <span className='error-span'><BsFillExclamationOctagonFill/>{error}</span>
              ) : false}
              </>
            ) : (
            <>
            <input required={required ? true : false} onChange={onChange} value={value} placeholder={placeholder} type={type ? type : "text"} name={name} id={id} />
            {error ? (
              <span className='error-span'><BsFillExclamationOctagonFill/>{error}</span>
            ) : false}
            </>
            )
          ) }
      </div>
    )
  }

  export function TextAreaBox({name, id, placeholder, label, value, onChange , required,error}) {
    return (
      <div className={"TextAreaBox" + (error ? " error" : "")}>
          {label && (
              <label htmlFor={id}>{label}</label>
          )}
          <textarea required={required ? true : false} onChange={onChange} value={value} placeholder={placeholder} name={name} id={id} />
          {error ? (
              <span className='error-span'><BsFillExclamationOctagonFill/>{error}</span>
            ) : false}
      </div>
    )
  }
  export function SelectBox({name, id, placeholder, label, children, onChange , required, style , value , defaultValue,subLabel , pd ,flex}) {
    return (
      <div style={flex ? {flex: +flex , ...style} : style} className={"SelectBox" + (pd === "none" ? " pd-none" : "")}>
          {label && (
              subLabel ? (
              <div className="sub-label">
                <label htmlFor={id}>{label}</label>
                {subLabel}
              </div>
              ) : (
                <label htmlFor={id}>{label}</label>
              )
          )}
          <select defaultValue={defaultValue} value={value} required={required ? true : false} onChange={onChange} placeholder={placeholder} name={name} id={id}>
            {children}
          </select>
      </div>
    )
  }
