import './SpotifyPlaylistCard.scss';

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified
  index: number
  clicked: Function
}

function SpotifyPlaylistCard({playlist,index,clicked}: Props) {
  
  return (
    <>
    <div className='spotify-playlist-card' onClick={()=>clicked(index)} style={{backgroundImage: "url("+playlist.images[0].url+")", backgroundSize: '100% 100%'}}>
      <div className="spotify-playlist-card__list font-on-image">
        <div className="spotify-playlist-card__list--title">
          <div className="spotify-playlist-card__list--title__index">
            {index+1}. 
          </div>
          <div className="spotify-playlist-card__list--title__name">
            { playlist.name }
          </div>
        </div> 
      </div> 
    </div>
     
    </>
    
  )
}

export default SpotifyPlaylistCard