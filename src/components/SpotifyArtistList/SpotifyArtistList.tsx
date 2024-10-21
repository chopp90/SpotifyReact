import { SpotifyArtistCard } from '..';
import './SpotifyArtistList.scss';

type Props = {
  artists: Array<SpotifyApi.ArtistObjectFull>
}

export function SpotifyArtistList({artists}: Props) {  
  return (
    <>
      <div className="spotify-artist-list">
        { artists.map((artist,index)=> (
          <SpotifyArtistCard key={index} artist={artist} index={index}/>
        ))
      }
      </div>
    </>
    
  )
}

export default SpotifyArtistList