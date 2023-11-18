import { useState } from 'react'
import './DropDown.scss'
import {BsFillCaretDownFill} from 'react-icons/bs'
import { useEffect } from 'react'
import { useRef } from 'react'
import CheckBox from '../CheckBox/CheckBox'

export default function DropDown({name,children,checkboxName,array,position,arrayForChecked}) {
    const [showMenu, setShowMenu] = useState(false)
    const [itemSlected, setItemSlected] = useState([])
    const dropdownRef = useRef(null);
    // document.body.onclick = (eo) => {
    //     if (!eo.target.className.contains("DropDown")) {
    //         setShowMenu(false)
    //     }
    // }

      
        // Event listener for click outside the dropdown
        const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowMenu(false);
          }
        };
    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []); // Empty dependency array ensures the effect runs only once
      const itemsCheckedsHandle = (eo) => {
        let arr = []
        setItemSlected([])
        const checkboxs = dropdownRef.current.querySelectorAll(".menu-dropdown .CheckBox")
            checkboxs.forEach(el => {
                // console.log(el.querySelector("input"));
                if (el.querySelector("input").checked) {
                    arr.push(el.querySelector("input").value)
                    // setItemSlected([...itemSlected,el.querySelector("input").value])
                    // console.log("checked");
                }
                // console.log(arr);
                setItemSlected(arr)
                
            })
            // setItemSlected(arr)
            console.log(itemSlected);
      }
  return (
    <div  ref={dropdownRef} className={`DropDown${showMenu ? " activeMenu" : "" }`}>
        <div  onClick={() => setShowMenu(!showMenu)} className="name">
          <div className="box-selected">
          {itemSlected.length ? (
              itemSlected.map((it) => (
                <div className='selected'>{it}</div>
              ))
            ) : name}
          </div>
        <div className="sahm">
        <BsFillCaretDownFill/>
        </div>
        </div>
        <div style={{position:position}} className="menu-dropdown">
            {/* {children} */}
            {array.map((cl,index) => (
                        <>
                        {arrayForChecked ? (
                          arrayForChecked.indexOf(cl) !== -1 ? (
                            <CheckBox checked={true} name={checkboxName} onChange={itemsCheckedsHandle} key={index} id={cl.id} label={cl.name}/> 
  
                          ) : (
                            <CheckBox name={checkboxName} onChange={itemsCheckedsHandle} key={index} id={cl.id} label={cl.name}/> 
                            
                            )
                            ) : (
                              <CheckBox name={checkboxName} onChange={itemsCheckedsHandle} key={index} id={cl.id} label={cl.name}/> 
                        )}
                        </>                
                        ))}
        </div>
  </div>
  )
}
