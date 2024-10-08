import './SpotifyTrackCard.scss';

type Props = {
  track: SpotifyApi.TrackObjectFull
  index: number
}

function SpotifyTrackCard({track,index}: Props) {
  const artistNames = track.artists.reduce((artists,artist,index) => artists += artist.name
  +(index === track.artists.length-1? '' :' | ' ), '')
  return (
    <>
      {/* "Normal" Display */}
      <a href={track.external_urls.spotify} target="_blank">
        <div className="spotify-track-card" >
          <div className="spotify-track-card__image" style={{backgroundImage: "url("+track.album.images[1].url+")", backgroundSize: '100% 100%'}}>
            <div className=" spotify-track-card__index">
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
      </a>
    </>
    
  )
}

export default SpotifyTrackCard