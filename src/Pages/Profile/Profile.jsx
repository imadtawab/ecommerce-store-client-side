import './Profile.scss'
import { BsPlus, BsX } from 'react-icons/bs'
import InputBox from '../../Components/InputBox/InputBox'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import Btn from '../../Components/Btn/Btn'
import {useDispatch , useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import undefined_avatar from "../../assets/undefined_avatar.png"
import { updateProfile_settings } from '../../store/usersSlice'

export default function Profile() {
  const {user , updateProfile_settings_Status} = useSelector(s => s.users)
  const [avatarImg , setAvatarImg] = useState(undefined_avatar)
  const [avatarImgPost , setAvatarImgPost] = useState(undefined)
  const [userName , setUserName] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const addFileInput = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setAvatarImg(user?.avatar)
    setUserName(user?.userName)
    setEmail(user?.email)
    setPhone(user?.phone)
  }, [user])
  const resetHandle = () => {
    setAvatarImg(user?.avatar)
    setUserName(user?.userName)
    setEmail(user?.email)
    setPhone(user?.phone)
    setAvatarImgPost(undefined)
  }
  const updateProfileHandle = () => {
    let newProfile = {}
    if(avatarImg !== user?.avatar && avatarImgPost !== "empty") {
      newProfile.avatar = avatarImgPost
      newProfile.oldAvatar = user?.avatar
    }
    if(avatarImgPost === "empty" && user?.avatar !== undefined_avatar) {
      newProfile.emptyAvatar = true
      newProfile.oldAvatar = user?.avatar
    }
    if(userName !== user?.userName) newProfile.userName = userName
    if(email !== user?.email) newProfile.email = email
    if(phone !== user?.phone) newProfile.phone = phone

    if(!Object.keys(newProfile).length) {
      console.log("not post profile ...");
      return
    }
    function createFormData() {
      const formData = new FormData();

      Object.keys(newProfile).forEach((key) => {
        formData.append(key, newProfile[key]);
      });
      return formData;
    }

    console.log(newProfile, createFormData());

    dispatch(updateProfile_settings(createFormData()))
  }
  
  const addAvatar = (eo) => {
      const file = eo.target.files[0];
      const reader = new FileReader();
      // it's onload event and you forgot (parameters)
      reader.onload = function (e) {
        // the result image data
        setAvatarImg(e.target.result)
      };
      // you have to declare the file loading
      reader.readAsDataURL(file);
      setAvatarImgPost(file)
      addFileInput.current.value = ""
  }
  
  return (
    // <PageStructure title="Profile">
        <div className='Profile'>
          <SectionStructure alone flex="1" title="Profile">
          {/* sub_p="Basic info, like your name and address that will displayed in public" */}
          <InputBox mx_width label="Avatar" personelInput={
            <div className='avatar'>
              <div style={{backgroundImage: `url(${avatarImg ? avatarImg : undefined_avatar})`}} className="avatar-container">
              {/* <img src={avatarImg ? avatarImg : undefined_avatar} alt=""/> */}
              </div>
              <label htmlFor='addAvatar' className="add-avatar">
                <input ref={addFileInput} onChange={addAvatar} type="file" name="addAvatar" id="addAvatar" />
                <BsPlus/>
              </label>
              <div onClick={() => {
                if(avatarImg !== undefined_avatar){
                  setAvatarImg(undefined_avatar);
                  setAvatarImgPost("empty")
                }}} className="delete-avatar">
                <BsX/>
              </div>
            </div>
          }/>
          <InputBox
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      mx_width
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      label="Name"
                    />
                              <InputBox
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      mx_width
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      label="Email"
                    />
                                             <InputBox
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      mx_width
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      label="Phone"
                    />
                     <div className="footer-buttons">
              <div className="box">
              
              </div>
              <div className="box">
              <Btn
              onClick={resetHandle}
                  btnStyle="outline"
                  color="danger"
                  element="button"
                >
                  Reset
                </Btn>
                <Btn
                  loading={updateProfile_settings_Status.isLoading}
                  onClick={updateProfileHandle}
                  btnStyle="bg"
                  color="success"
                  element="button"
                  type="submit"
                >
                  Update
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
    // </PageStructure>
  )
}
