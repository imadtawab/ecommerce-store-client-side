import './Password.scss'
import { BsPlus, BsX } from 'react-icons/bs'
import InputBox from '../../Components/InputBox/InputBox'
import PageStructure from '../../Components/PageStructure/PageStructure'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import Btn from '../../Components/Btn/Btn'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../Components/Alert/Alert'
import { updatePassword_settings } from '../../store/usersSlice'

export default function Profile() {
  const {updatePassword_settings_Status} = useSelector(s => s.users)
  const dispatch = useDispatch()

  const [current_password , setCurrent_password] = useState("")
  const [new_password , setNew_password] = useState("")
  const [confirm_password , setConfirm_password] = useState("")

  const updatePasswordHandle = () => {
    dispatch(updatePassword_settings({
      current_password,
      new_password,
      confirm_password
    })).then(docs => {
      setCurrent_password("")
      setNew_password("")
      setConfirm_password("")
    })
  }
  return (
    <>
        {(updatePassword_settings_Status.error || updatePassword_settings_Status.success) && 
          <Alert type={updatePassword_settings_Status.error ? "danger" : "success"}>{updatePassword_settings_Status.error || updatePassword_settings_Status.success}</Alert>
        }
        {/* {updatePassword_Status.success && 
          <Alert type="success">{updatePassword_Status.success}</Alert>
        } */}
        
        <div className='Password'>
          <SectionStructure alone flex="1" title="Password">
          {/* sub_p="Basic info, like your name and address that will displayed in public" */}
          <InputBox
                      value={current_password}
                      onChange={(e) => setCurrent_password(e.target.value)}
                      mx_width
                      type="password"
                      name="current_password"
                      id="current_password"
                      placeholder="Current Password"
                      label="Current Password"
                    />
                              <InputBox
                      value={new_password}
                      onChange={(e) => setNew_password(e.target.value)}
                      mx_width
                      type="password"
                      name="new_password"
                      id="new_password"
                      placeholder="New Password"
                      label="New Password"
                    />
                              <InputBox
                              // error={new_password !==confirm_password && "Please enter your true password"}
                      value={confirm_password}
                      onChange={(e) => setConfirm_password(e.target.value)}
                      mx_width
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
                     <div className="footer-buttons">
              <div className="box">
              
              </div>
              <div className="box">
              {/* <Btn
                  btnStyle="outline"
                  color="danger"
                  element="a"
                  to={""}
                >
                  Reset
                </Btn> */}
                <Btn
                onClick={updatePasswordHandle}
                loading={updatePassword_settings_Status.isLoading}
                  btnStyle="bg"
                  color="success"
                  element="button"
                  type="submit"
                >
                  Update Password
                </Btn>
              </div>
            </div>
          </SectionStructure>
         
          {/* <SectionStructure flex="1" title="Preferences"> 
          // sub_p="Your personalized preference displayed in your account" 
            hello word
          </SectionStructure> 
          */}
        </div>
    </>
  )
}
