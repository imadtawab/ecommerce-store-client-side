import './CheckBox.scss'
import {BsCheckLg} from 'react-icons/bs'
export default function CheckBox({name,id,label,onChange,key,checked}) {
  return (
    <div key={key} className='CheckBox'>
        <input checked={checked} value={label} onChange={onChange} type="checkbox" name={name} id={id}/>
        <label htmlFor={id}>
            <BsCheckLg/>
        </label>
        {label && (
            <label className='label' htmlFor={id}>{label}</label>
        )}
    </div>
  )
}
