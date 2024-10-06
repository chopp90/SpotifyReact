import { Outlet } from "react-router-dom"
import './HeaderNavigation.scss';

export type NavigationItem = {
  name: string, 
  url: string,
}

function HeaderNavigation() {
  const navigationItems : Array<NavigationItem> = [
    { name: 'Home', url: 'Home' },
    { name: 'Login', url: 'Login' },
    { name: 'profile', url: 'Profile' },
    { name: 'Demo', url: '/demo' }
  ]
  return (
    <>
      <div className="header-navigation__container">
        { navigationItems.map((item,index)=> (
            <div key={index} className="header-navigation__item">
              <a href={item.url}>
              {item.name}
              </a>
            </div>
        ))
        }
      </div>
    </>
    
  )
}

export default HeaderNavigation