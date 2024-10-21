
import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyPlaylistList } from "../components"
import './TopList.scss';
import { useInView } from "react-intersection-observer";


function Playlists() {
  const [playlists,setPlaylists] = useState<Array<SpotifyApi.PlaylistObjectSimplified>>([])
  const [next, setNext ] = useState<string>('')
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>(undefined)
  const apiService = new SpotifyApiService()

  async function onPlaylistClicked(){
    const response = await apiService.get(playlists[0].href.split(`https://api.spotify.com/v1/`)[1]) as SpotifyApi.PlaylistObjectFull
    setSelectedPlaylist(response)
  }

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

  return (
    <> 
    {/* <div className="spotify-playlists"> */}
      <div className="spotify-playlists__header">
        <button className="spotify-playlists__header--button" onClick={()=>onPlaylistClicked()}>
          click me!
        </button>        
      </div>

      <div className="spotify-playlists__content">

        <div className="spotify-playlists__content--lists">
          <SpotifyPlaylistList playlists={playlists}></SpotifyPlaylistList>
          {/* { JSON.stringify(playlists)} */}
          {/* { playlists.map((playlist) => (
            <div>{playlist.name}</div>
          ))} */}
        </div>
        <div className="spotify-playlists__content--selected">
          { JSON.stringify(selectedPlaylist)}
        </div>
      </div>
      <div ref={ref}>TODO: loading feedback... or stop indication!</div>
      
    </>
  )
}

export default Playlists