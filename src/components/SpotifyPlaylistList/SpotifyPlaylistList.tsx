import { SpotifyPlaylistCard } from '..';
import './SpotifyPlaylistList.scss';

type Props = {
  playlists: Array<SpotifyApi.PlaylistObjectSimplified>
  clicked: Function
}

export function SpotifyPlaylistList({playlists,clicked}: Props) {  
  

  return (
    <>
      <div className="spotify-playlist-list">
        { playlists.map((playlist,index)=> (
          <SpotifyPlaylistCard key={index} playlist={playlist} index={index} clicked={clicked}/>
        ))
      }
      </div>
    </>
    
  )
}

export default SpotifyPlaylistList