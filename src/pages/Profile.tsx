import { useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyArtistCard, SpotifyArtistList } from "../components"


const apiService = new SpotifyApiService()

function Profile() {
const [artists,setArtists] = useState<Array<SpotifyApi.ArtistObjectFull>>([])



  async function onClick () {
 
    const response = await apiService.get('/me')
    console.log("response: ",response)
    }
  async function onClick2 () {
    const response = await apiService.get('/me/top/artists', {
      time_range: 'medium_term',
      limit:50,
      offset:0,
    }) as SpotifyApi.UsersTopArtistsResponse
    console.log("response: ",response)
    if(response && response.items){
  
      setArtists(response.items)
    }
    }



  return (
    <>
    <div>
    <button onClick={onClick}>
        So Profile!
      </button>
      <button onClick={onClick2}>
        So TopArtists!
      </button>
      <SpotifyArtistList artists={artists} />
    </div>
    </>
  )
}

export default Profile