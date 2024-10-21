import './SpotifyPlaylistCard.scss';

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified
  index: number
}

function SpotifyPlaylistCard({playlist,index}: Props) {
  
  return (
    <>
    { JSON.stringify(playlist) }
    { playlist.name}
    { playlist.tracks.total}
    { index }
      {/* <a href={artist.external_urls.spotify} target='_blank'>
        <div className="spotify-artist-card" style={{backgroundImage: "url("+artist.images[2].url+")", backgroundSize: '100% 100%'}}>
          <div className="spotify-artist-card__list font-on-image">
            <div className="spotify-artist-card__list--title">
              <div className="spotify-artist-card__list--title__index">
                {index+1}. 
              </div>
              <div className="spotify-artist-card__list--title__name">
                { artist.name }
              </div>
            </div> 
            { artist.genres.map((genre,index) => (
              <div key={index} className=" spotify-artist-card__list--item">
              { genre }
            </div> 
            ))}
          </div>
        </div>
      </a> */}
    </>
    
  )
}

export default SpotifyPlaylistCard