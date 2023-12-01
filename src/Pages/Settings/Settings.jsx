import { NavLink, Outlet } from 'react-router-dom'
import PageStructure from '../../Components/PageStructure/PageStructure'
import './Settings.scss'

export default function Profile() {
  return (
    <PageStructure title="Settings">
        <div className='Settings'>
            <div className="header-settings">
                <ul>
                    <li><NavLink to={"/admin/settings"} end>Profile</NavLink></li>
                    <li><NavLink to={"/admin/settings/password"}>Password</NavLink></li>
                    <li><NavLink to={"/admin/settings/notification"}>Notification</NavLink></li>
                    <li><NavLink to={"/admin/settings/integration"}>Integration</NavLink></li>
                    <li><NavLink to={"/admin/settings/billing"}>Billing</NavLink></li>
                </ul>
            </div>
            <div className="main-content-settings">
              <Outlet/>
            </div>
        </div>
    </PageStructure>
  )
}
