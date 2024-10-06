import { SpotifyApiService } from "../services/SpotifyApiService"


const apiService = new SpotifyApiService()

async function onClick () {
 
  const response = await apiService.get('/me')
  console.log("response: ",response)
  }
async function onClick2 () {
  const response = await apiService.get('/me/top/artists', {
    time_range: 'medium_term',
    limit:10,
    offset:0,
  })
  console.log("response: ",response)
  }

function Profile() {

  return (
    <>
    <div>
    <button onClick={onClick}>
        So Profile!
      </button>
      <button onClick={onClick2}>
        So TopArtists!
      </button>
    </div>
    </>
  )
}

export default Profile