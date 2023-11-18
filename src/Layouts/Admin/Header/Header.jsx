import "./Header.scss";
import { BiMenu , BiBell , BiCog, BiSolidCog } from 'react-icons/bi'
import { FaArrowRightToBracket, FaUserLarge } from 'react-icons/fa6'
import profileImg from "../../../assets/profile.jpg"
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/usersSlice";

export default function Header({setSideBarShow,sideBarShow}) {
  const dispatch = useDispatch()
  const {user} = useSelector(s => s.users)
  const [profileMenu, setProfileMenu] = useState(false)
  const dropdownRef = useRef(null);
  const signOut = useSignOut()
          // Event listener for click outside the dropdown
          const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setProfileMenu(false);
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

  return (
    <div className="Header">
        <div onClick={()=>{
          setSideBarShow(!sideBarShow)
          sessionStorage.setItem("showSideBar",!sideBarShow)
          }} className="menu-icon">
          <BiMenu/>
        </div>
        <div className="bar">
          <div className="notification">
            <BiBell/>
          </div>
          <div   className="profile" onClick={()=> setProfileMenu(!profileMenu)}   ref={dropdownRef}>
            <div className="img">
              <img src={profileImg} alt="Profile" />
            </div>
            <div className="info">
              <p>Admin</p>
              <h6>{user?.userName || "admin"}</h6>
            </div>
            <ul className={`menu ${profileMenu ? " active" : ""}`}>
              <li>  
                <NavLink to="/admin/account/profile">
                <FaUserLarge/>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/settings">
                <BiSolidCog/>
                  Settings
                </NavLink>
              </li>
              <li onClick={() => {
                  console.log("logout");
                  signOut()
                  dispatch(logout())
                }}>
                <div>
                <FaArrowRightToBracket/>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}
