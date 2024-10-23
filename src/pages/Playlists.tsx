
import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyPlaylistCard, SpotifyPlaylistList, SpotifyTrackList } from "../components"
import './Playlists.scss';
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';


function Playlists() {
  const [playlists,setPlaylists] = useState<Array<SpotifyApi.PlaylistObjectSimplified>>([])
  const [next, setNext ] = useState<string>('')
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified | undefined>(undefined)
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState<Array<SpotifyApi.TrackObjectFull>>([])
  const apiService = new SpotifyApiService()
  const navigate = useNavigate();

  // async function onPlaylistClicked(){
  //   const response = await apiService.get(playlists[0].href.split(`https://api.spotify.com/v1/`)[1]) as SpotifyApi.PlaylistObjectFull
  //   setSelectedPlaylist(response)
  // }

  async function fetchPlaylists() {
    if(next === 'end'){
      console.warn('end of next in fetchPlaylists()')
      return
    }
    let response: SpotifyApi.ListOfCurrentUsersPlaylistsResponse
    if(!next){
      response = await apiService.get(`/me/playlists`,{
        limit:20,
        offset:0,
      })
    }else{
      response = await apiService.get(next.split(`https://api.spotify.com/v1/`)[1])
    }
    console.log("reponse",response)
    console.log("reponse",response.items)
    console.log(playlists)
    
    setNext(response.next || 'end')
    setPlaylists([...playlists.concat(response.items)])
  }

  
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(()=> {
    fetchPlaylists()
  }, [inView])

  async function onChildClicked(index: number) {
    console.log("fetching playlist: ",playlists[index].href.split(`https://api.spotify.com/v1/`)[1])
    setSelectedPlaylist(playlists[index])
    const response = await apiService.get(playlists[index].href.split(`https://api.spotify.com/v1/`)[1] + '/tracks') as SpotifyApi.PlaylistTrackResponse
    setSelectedPlaylistTracks(response.items.map((item)=>item.track!))
  }

  function shuffleClicked(){
    navigate(`/playlistShuffle/${selectedPlaylist?.id}`)  
  }
  
  function populateClicked(){
    navigate(`/playlistPopulate/${selectedPlaylist?.id}`)  
  }


  return (
    <> 
      <div className="spotify-playlists">

        <div className="spotify-playlists--lists">
          <SpotifyPlaylistList playlists={playlists} clicked={onChildClicked}></SpotifyPlaylistList>
        </div>
        { selectedPlaylist && 
          <div className="spotify-playlists__selected">
            <div className="spotify-playlists__selected--header">
              <button className="spotify-playlists__selected--button" onClick={shuffleClicked}>
                to Shuffle
              </button>        
              <button className="spotify-playlists__selected--button" onClick={populateClicked}>
                to Populate
              </button>        
            </div>
            <div className="spotify-playlists__selected--list">
              {selectedPlaylist &&<SpotifyPlaylistCard index={-1} playlist={selectedPlaylist!} clicked={()=>{}}></SpotifyPlaylistCard>}
              <SpotifyTrackList tracks={selectedPlaylistTracks}></SpotifyTrackList>
              { JSON.stringify(selectedPlaylist)}
            </div>
          </div>
        }
      </div>
      <div ref={ref}>TODO: loading feedback... or stop indication!</div>
      
    </>
  )
}

export default Playlists