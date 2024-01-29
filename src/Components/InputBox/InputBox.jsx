import { BsFillExclamationOctagonFill } from 'react-icons/bs'
import './InputBox.scss'

export default function InputBox({error, type, name, id, placeholder, label , value , personelInput,onChange,required , mx_width , flex , pd}) {
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
            <>
            <input required={required ? true : false} onChange={onChange} value={value} placeholder={placeholder} type={type ? type : "text"} name={name} id={id} />
            {error ? (
              <span className='error-span'><BsFillExclamationOctagonFill/>{error}</span>
            ) : false}
            </>
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
  export function SelectBox({name, id, placeholder, label, children, onChange , required, style , value , defaultValue,subLabel , pd}) {
    return (
      <div style={style} className={"SelectBox" + (pd === "none" ? " pd-none" : "")}>
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
