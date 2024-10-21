import { SpotifyApiService } from '../../services/SpotifyApiService';
import './SpotifyTrackCard.scss';

type Props = {
  track: SpotifyApi.TrackObjectFull
  index: number
}

const apiService = new SpotifyApiService()
async function addTrackToQueue ( uri: string )  {
  return await apiService.post(`/me/player/queue?uri=${uri}`, {}
  ) as SpotifyApi.AddToQueueResponse
}

function openTrackInTab( url: string) {
  window.open( url , '_blank')
}

function SpotifyTrackCard({track,index}: Props) {
  const artistNames = track.artists.reduce((artists,artist,index) => artists += artist.name
  +(index === track.artists.length-1? '' :' | ' ), '')
  return (
    <>
        <div className="spotify-track-card" 
          onClick={ () => openTrackInTab(track.external_urls.spotify)} 
          onContextMenu={ (e) =>{ e.preventDefault(); addTrackToQueue(track.uri)}}
        >
          <div className="spotify-track-card__image" style={{backgroundImage: "url("+track.album.images[1].url+")", backgroundSize: '100% 100%'}}>
            <div className=" spotify-track-card__index font-on-image">
              {index+1}
            </div>
          </div>
          <div className="spotify-track-card__list">
            <div className="spotify-track-card__list--title">
              { track.name }
            </div> 
            
            <div className="spotify-track-card__list--artists">
              { artistNames }
            </div> 
            
          </div>
        </div>
    </>
    
  )
}

export default SpotifyTrackCard