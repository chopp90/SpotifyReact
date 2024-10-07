import './SpotifyArtistCard.scss';

type Props = {
  artist: SpotifyApi.ArtistObjectFull
}

function SpotifyArtistCard({artist}: Props) {
  
  return (
    <>
    {/* "Normal" Display */}
      {/* <div className="spotify-artist-card" >
        <img className="spotify-artist-card__image" src={artist.images[2].url}/>
        <div className="spotify-artist-card__list">
          <div className="spotify-artist-card__list--item">
            { artist.name }
          </div> 
          
          <div className="spotify-artist-card__list--item">
            { artist.genres.join(' | ') }
          </div> 
          
        </div>
      </div> */}

    {/* Fance Color over Image Display */}
      <div className="spotify-artist-card" style={{backgroundImage: "url("+artist.images[1].url+")", backgroundSize: '320px 320px'}}>
        <div className="spotify-artist-card__list">
          <div className="spotify-artist-card__list--item-v2 spotify-artist-card__list--name-v2">
            { artist.name }
          </div> 
          {/* <div className="spotify-artist-card__list--item-v2">
            { artist.followers.total }
          </div>  */}
          { artist.genres.map((genre) => (
            <div className="spotify-artist-card__list--item-v2">
            { genre }
          </div> 
          ))}
          {/* <div className="spotify-artist-card__list--item-v2">
            { artist.genres.join(' | ') }
          </div>  */}
          {/* <div className="spotify-artist-card__list--item-v2">
            { artist.popularity}
          </div>  */}
        </div>
      </div>

      {/* { [artist].map((artist)=> JSON.stringify(artist)) } */}
    </>
    
  )
}

export default SpotifyArtistCard