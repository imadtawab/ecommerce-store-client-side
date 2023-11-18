import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './ClientLayout.scss'
import { Outlet } from 'react-router'
import {NavLink} from 'react-router-dom'
import { FaCartShopping } from 'react-icons/fa6'
import { BiMenu } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import logoImg from "../../../assets/371ea0d5-6da8-45d8-a97b-0742ae669c82.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { getShoppingCard } from '../../../store/usersSlice'
export default function ClientLayout() {
  const [showMenuBar, setShowMenuBar] = useState(false)
  const dispatch = useDispatch()
  const {shoppingCard , getShoppingCardStatus} = useSelector(s => s.users)
  const [numberOfCard , setNumberOfCard] = useState([...shoppingCard.map(p => p.variants.length),0,0].reduce((a,b) => a + b))

  useEffect(() => {
    dispatch(getShoppingCard())
  }, [dispatch])

  useEffect(() => {
        setNumberOfCard([...shoppingCard.map(p => p.variants.length),0,0].reduce((a,b) => a + b))
  }, [shoppingCard])
  

  return (
    <div className='ClientLayout'>
      <div className="header">
      <div className="container">
      <div className="menu-icon">
              {/* <NavLink to="cart"><FaCartShopping/></NavLink> */}
              <BiMenu onClick={() => setShowMenuBar(!showMenuBar)} />
            </div>
            <div className="logo">
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="254"
              height="292"
              fill="none"
              viewBox="0 0 254 292"
          >
              <path
              fill="url(#paint0_linear_375_2)"
              d="M62.982 36.256L.333 72.512l-.2 72.913L0 218.403l63.048 36.39c34.657 19.994 63.249 36.389 63.582 36.389.333 0 17.595-9.863 38.456-21.86 20.794-12.063 49.185-28.392 63.048-36.389l25.126-14.53v-31.257l-1.466.8c-.867.466-29.258 16.795-63.115 36.389-33.924 19.594-61.982 35.456-62.382 35.39-.467-.133-22.86-12.93-49.852-28.525l-49.12-28.325V88.241L49.52 75.445c12.13-6.998 34.39-19.794 49.386-28.459 14.929-8.664 27.458-15.728 27.725-15.728.267 0 17.662 9.93 38.655 22.06l61.183 34.923 9.649-5.678 17.143-10.05-26.792-15.263C205.274 44.72 127.097-.067 126.43 0c-.4 0-28.992 16.329-63.448 36.256z"
              ></path>
              <path
              fill="url(#paint1_linear_375_2)"
              d="M190.611 108.702c-34.256 19.794-62.781 36.189-63.381 36.323-.667.2-17.395-9.131-39.189-21.661l-38.055-21.993v15.795l.066 15.729 36.99 21.327c20.327 11.73 37.655 21.594 38.522 21.927 1.333.467 10.663-4.665 64.114-35.523 34.39-19.928 62.782-36.389 63.115-36.656.267-.267.4-7.398.334-15.862l-.2-15.396-62.316 35.99z"
              ></path>
              <path
              fill="url(#paint2_linear_375_2)"
              d="M246.262 133.828c-3.666 2.066-31.924 18.395-62.848 36.256-30.925 17.862-56.451 32.457-56.784 32.457-.333 0-17.595-9.863-38.456-21.86l-37.855-21.86-.2 15.329c-.133 11.73.066 15.528.666 16.128 1.267 1.133 75.045 43.588 75.845 43.588.667 0 125.097-71.646 126.164-72.579.266-.267.399-7.398.333-15.929l-.2-15.396-6.665 3.866z"
              ></path>
              <defs>
              <linearGradient
                  id="paint0_linear_375_2"
                  x1="126.63"
                  x2="126.63"
                  y1="291.182"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
              >
                  <stop stop-color="#00546B"></stop>
                  <stop offset="1" stop-color="#27BEA3"></stop>
              </linearGradient>
              <linearGradient
                  id="paint1_linear_375_2"
                  x1="151.565"
                  x2="151.565"
                  y1="176.177"
                  y2="72.712"
                  gradientUnits="userSpaceOnUse"
              >
                  <stop stop-color="#00546B"></stop>
                  <stop offset="1" stop-color="#27BEA3"></stop>
              </linearGradient>
              <linearGradient
                  id="paint2_linear_375_2"
                  x1="151.612"
                  x2="151.612"
                  y1="233.866"
                  y2="129.962"
                  gradientUnits="userSpaceOnUse"
              >
                  <stop stop-color="#00546B"></stop>
                  <stop offset="1" stop-color="#27BEA3"></stop>
              </linearGradient>
              </defs>
              </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
              {/* <img style={{width: "125px"}} src={logoImg} alt="" /> */}
              <h1>Evershop</h1>
            </div>
            <div className="menu-icon">
              <NavLink to="cart"><FaCartShopping/>
            {numberOfCard > 0 ? <div className="numberOfCard">({numberOfCard})</div> : false}
            {/* {shoppingCard.length > 0 ? <div className="numberOfCard">({shoppingCard.length})</div> : false} */}
              </NavLink>
              
              {/* <BiMenu onClick={() => setShowMenuBar(!showMenuBar)} /> */}
            </div>
              <ul className={`navbar ${showMenuBar ? "activeMenuBar" : ""}`}>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
              <div className="right-section">
                <NavLink to="cart"><FaCartShopping/>
                       {/* {localStorage.getItem("shoppingCard") ? (
                              <div className="numberOfCard">({JSON.parse(localStorage.getItem("shoppingCard")).length})
                            </div>
              ): false
              } */}
              {numberOfCard > 0 ? <div className="numberOfCard">({numberOfCard})</div> : false}
              </NavLink>
                {/* <NavLink to="cart">Go to Cart <FaArrowRight/></NavLink> */}
              </div>
        </div>
      </div>
      <div className="main-content">
        <Outlet/>
      </div>
        <div className="footer">
            <div className="links">
              <div className="box">
                  <div className="logo">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> */}
                  <img src="../../../assets/371ea0d5-6da8-45d8-a97b-0742ae669c82.jpg" alt="" />
                  <h1>Evershop</h1>
                </div>
                  </div>
            
              <div className="parent">
              <div className="box">
              <h6>Categories</h6>
              <ul>
                <li>
                  <NavLink>First Link</NavLink>
                </li>
                  <li>
                    <NavLink>Second Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Third Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Fourth Link</NavLink>
                  </li>
              </ul>
            </div> <div className="box">
              <h6>Categories</h6>
              <ul>
                <li>
                  <NavLink>First Link</NavLink>
                </li>
                  <li>
                    <NavLink>Second Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Third Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Fourth Link</NavLink>
                  </li>
              </ul>
            </div> <div className="box">
              <h6>Categories</h6>
              <ul>
                <li>
                  <NavLink>First Link</NavLink>
                </li>
                  <li>
                    <NavLink>Second Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Third Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Fourth Link</NavLink>
                  </li>
              </ul>
            </div>
            <div className="box">
              <h6>Categories</h6>
              <ul>
                <li>
                  <NavLink>First Link</NavLink>
                </li>
                  <li>
                    <NavLink>Second Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Third Link</NavLink>
                  </li>
                  <li>
                    <NavLink>Fourth Link</NavLink>
                  </li>
              </ul>
            </div>
              </div>
              </div>
            <div className="bottom">
              <p>
                © 2023 Evershop ___ @Imad Tawab
              </p>
              <div className="social-media-links">
                <a href="#"> <FaFacebook/> </a>
                <a href="#"> <FaTwitter/> </a>
                <a href="#"> <FaInstagram/> </a>
                <a href="#"> <FaLinkedin/> </a>
              </div>
            </div>
        </div>
    </div>
  )
}
