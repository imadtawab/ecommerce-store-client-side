import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { adminAPI } from '../API/axios-global'
import { useNavigate } from 'react-router'
import {useCookies} from 'react-cookie'
// import jwt from 'jsonwebtoken'

export default function Auth_admin({children}) {
  const {user} = useSelector(s => s.users)
  const [cookies , setCookies] = useCookies()
  const navigate = useNavigate()
  // adminAPI.get()
  // const changeDirection = () => {
  //   navigate("/admin/account/login")
  // }
  // if(false){
  //   return <>{children}</>
  // }else{
  //   {changeDirection()}
  //   return false
  // }
  // adminAPI.
  // useEffect(() => {
  //   const token = cookies.token
  //   if(token){
  //     const user = jwt.decode(token)
  //     if(!user){
  //       setCookies("token",null)
  //       navigate("/admin/account/login")
  //     }else{
  //       adminAPI.post("/api/auth" ,token, {
  //         headers:{
  //           Authorization: token
  //         }
  //       })
  //     }
  //   }
  // }, [])
  

// ::::::::::::::::::::::::::::::::::::::::::::
  // useEffect(() => {
    
  //   console.log(cookies?.token,user?.token)
  //   if(cookies?.token && user?.token){
  //     if(cookies?.token === user?.token){
  //       navigate("/admin")
  //       return (
  //         <>{children}</>
  //       )
  //     }else{
  //       navigate("/admin/account/login");
  //       return false
  //     }
  //   }else{
  //     navigate("/admin/account/login");
  //     return false
  //   }
  // },[])
  // useEffect(() => {
  //   if(user){
      return (
        <>{children}</>
      )

//     }else{
//           navigate("/admin/account/login");
//       return 
//     }
//   },[user])
}
