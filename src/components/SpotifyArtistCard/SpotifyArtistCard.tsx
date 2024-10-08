import './SpotifyArtistCard.scss';

type Props = {
  artist: SpotifyApi.ArtistObjectFull
  index: number
}

function SpotifyArtistCard({artist,index}: Props) {
  
  return (
    <>
      {/* Fance Color over Image Display */}
      <a href={artist.external_urls.spotify} target='_blank'>
        <div className="spotify-artist-card" style={{backgroundImage: "url("+artist.images[2].url+")", backgroundSize: '100% 100%'}}>
          <div className="spotify-artist-card__list">
            <div className="spotify-artist-card__list--title">
              <div className="spotify-artist-card__font spotify-artist-card__list--title__index">
                {index+1}. 
              </div>
              <div className="spotify-artist-card__font spotify-artist-card__list--title__name">
                { artist.name }
              </div>
            </div> 
            { artist.genres.map((genre,index) => (
              <div key={index} className="spotify-artist-card__font spotify-artist-card__list--item">
              { genre }
            </div> 
            ))}
          </div>
        </div>
      </a>
    </>
    
  )
}

export default SpotifyArtistCard