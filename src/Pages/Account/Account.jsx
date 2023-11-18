import './Account.scss'
import InputBox from '../../Components/InputBox/InputBox'
import Btn from '../../Components/Btn/Btn'
import { useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { loginUser, registerUser } from '../../store/usersSlice'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import Alert from '../../Components/Alert/Alert'
import { useSignIn } from 'react-auth-kit';

export default function Account({page , children}) {
  const {registerUserStatus , loginUserStatus , addAuthToStateStatus} = useSelector(s => s.users)
  // const navigate = useNavigate()
  // if(registerUserStatus.success){
  //   navigate("/admin/account/login")
    
  // }
  return (
    <>
            {registerUserStatus.isLoading && (
      <ShadowLoading/>
    )}
    {registerUserStatus.error && (
      <Alert type="danger">{registerUserStatus.error}</Alert>
    )}
        {addAuthToStateStatus.error && (
      <Alert type="danger">{addAuthToStateStatus.error}</Alert>
    )}
          {registerUserStatus.success && (
            <Alert type="success">{registerUserStatus.success}</Alert>
          )}
                      
    {loginUserStatus.error && (
      <Alert type="danger">{loginUserStatus.error}</Alert>
    )}

    <div className='Account'>
        <h3>{page}</h3>
        {children}
    </div>
    </>
  )
}


export function Login() {
  const navigate = useNavigate()
  const {loginUserStatus} = useSelector(s => s.users)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = useSignIn()

  const loginHandle = (e) => {
    e.preventDefault()
    // console.log({userName,email,password,confirmPassword});
    dispatch(loginUser({email,password})).then((docs) => {
      console.log(docs.payload.token, docs.payload.user.email);
      if(docs.type === "loginUser/fulfilled"){
        signIn({
          token: docs.payload.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {email: docs.payload.user.email}
        })
        navigate("/admin")
      }

    })
    // navigate("/admin/account/login")
    
  }
  return (
    <Account page="Login">
        <form onSubmit={loginHandle} action="">
            <InputBox required onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
            <InputBox required onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <br />
            <Btn width="full" type="sbmit" element="button" btnStyle="bg" color="success">Login</Btn>
        </form>
    </Account>
  )
}
export function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {registerUserStatus} = useSelector(s => s.users)

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const registerHandle = (e) => {
    e.preventDefault()
    // console.log({userName,email,password,confirmPassword});
    dispatch(registerUser({userName,email,password})).then((docs) => {
      console.log(docs);
      if(docs.type === "registerUser/fulfilled"){
        navigate("/admin/account/login")
      }

    })
    // navigate("/admin/account/login")
    
  }
  return (

    <>
    <Account page="Register">
        <form onSubmit={registerHandle} action="">
            <InputBox required onChange={(e) => setUserName(e.target.value)} value={userName} type="text" name="userName" id="userName" placeholder="User Name" label="User Name" />
            <InputBox required onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
            <InputBox required onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <InputBox required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" label="Confirm Password" />
            <br />
            <Btn loading={registerUserStatus.isLoading} width="full" type="sbmit" element="button" btnStyle="bg" color="success">Create Account</Btn>
        </form>
    </Account>
    </>
  )
}
