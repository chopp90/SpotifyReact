import { spotify_API_client_id, spotify_API_client_secret } from "../data/client"
import { SpotifyApiService } from "../services/SpotifyApiService"

const spotify = new SpotifyApiService()

async function onClick () {
  const response = await spotify.post('api/token', {
    'grant_type': 'client_credentials',
    'client_id': spotify_API_client_id,
    'client_secret': spotify_API_client_secret
    }
  )
  console.log("response: ",response)
}

function Empty() {

  return (
    <>
    <div>
      <button onClick={onClick}>
        login
      </button>
    </div>
    </>
  )
}

export default Empty