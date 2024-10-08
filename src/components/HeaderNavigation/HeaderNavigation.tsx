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
    { name: 'topArtists', url: 'TopArtists' },
    { name: 'topTracks', url: 'TopTracks' },
    { name: 'Demo', url: '/demo' }
  ]
  return (
    <>
      <div className="header-navigation">
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