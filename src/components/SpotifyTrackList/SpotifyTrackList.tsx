
import { SpotifyTrackCard } from '..';
import './SpotifyTrackList.scss';

type Props = {
  tracks: Array<SpotifyApi.TrackObjectFull>
}

export function SpotifyTrackList({tracks}: Props) {  
  return (
    <>
      <div className="spotify-track-list">
        { tracks.map((track,index)=> (
          <SpotifyTrackCard key={index} track={track} index={index}/>
          ))
        }
      </div>
    </>
    
  )
}

export default SpotifyTrackList