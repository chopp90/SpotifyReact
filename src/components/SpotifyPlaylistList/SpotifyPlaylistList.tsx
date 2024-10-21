import { SpotifyPlaylistCard } from '..';
import './SpotifyPlaylistList.scss';

type Props = {
  playlists: Array<SpotifyApi.PlaylistObjectSimplified>
}

export function SpotifyPlaylistList({playlists}: Props) {  
  return (
    <>
      <div className="spotify-artist-list">
        { playlists.map((playlist,index)=> (
          <SpotifyPlaylistCard key={index} playlist={playlist} index={index}/>
        ))
      }
      </div>
    </>
    
  )
}

export default SpotifyPlaylistList