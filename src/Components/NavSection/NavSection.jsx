import { NavLink } from 'react-router-dom'
import './NavSection.scss'

export default function NavSection({name,links}) {
  return (
    <div className='NavSection'>
        <h5>{name}</h5>
        <ul>
            {links.map((link,ind) => (  
                <div key={ind}>
                               <NavLink end style={{"--content": `"${link.title}"`}} to={link.href}>
                      {link.icon}
                      <h4>{link.title}</h4>
                    </NavLink>
                </div>
            )
            )}
        </ul>
    </div>
  )
}
