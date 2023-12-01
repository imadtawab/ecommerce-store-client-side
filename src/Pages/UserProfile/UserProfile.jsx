import React from "./UserProfile.scss"
import undefined_avatar from "../../assets/undefined_avatar.png"
import { useSelector } from "react-redux";
export default function UserProfile() {
  const {user} = useSelector(s => s.users)
  return (
    <div className='UserProfile'>
        <div className="couverture-picture">
            <div className="avatar">
                <img src={user?.avatar} alt="" />
            </div>
        </div>

    </div>
  )
}
