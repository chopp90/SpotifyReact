import Queue from '../Queue/Queue';
import './HeaderNavigation.scss';
import { baseURL } from '../../App';

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
    { name: 'Playlists', url: 'Playlists' },
    { name: 'PlaylistShuffle', url: 'PlaylistShuffle' },
    { name: 'playlistPopulate', url: 'PlaylistPopulate' },
  ]
  return (
    <>
      <div className="header-navigation">
        <Queue/>
        { navigationItems.map((item,index)=> (
            <div key={index} className="header-navigation__item">
              <a href={baseURL+'/'+item.url}>
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