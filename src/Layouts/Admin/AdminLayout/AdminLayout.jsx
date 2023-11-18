import { Outlet } from 'react-router'
import './AdminLayout.scss'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'
import { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import { useCookies } from 'react-cookie'
import { adminAPI } from '../../../API/axios-global'
import { useDispatch, useSelector } from 'react-redux'
import { addAuthToState } from '../../../store/usersSlice'

export default function AdminLayout() {
  const {user} = useSelector(s => s.users)
  const [sideBarShow , setSideBarShow ] = useState(sessionStorage.getItem("showSideBar") ? sessionStorage.getItem("showSideBar") === "true" ? true : false : true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("object");
    if(!user){
      dispatch(addAuthToState())
    }
    // if(sessionStorage.getItem("showSideBar")){
    //   setSideBarShow(sessionStorage.getItem("showSideBar") === "true" ? true : false)
    // }
  },[])
  return (
    <>
        <div className='AdminLayout'>
          <SideBar sideBarShow={sideBarShow}  setSideBarShow={setSideBarShow}/>
          <div className={"main-container" + (sideBarShow ? " sideBarShow" : "")}>
            <Header sideBarShow={sideBarShow} setSideBarShow={setSideBarShow}/>
            <Outlet/>
          <Footer/>
          </div>
        </div>
    </>
  )
}
