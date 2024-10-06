import { SpotifyAuthService } from "../services/SpotifyAuthService"

const authService = new SpotifyAuthService()

async function onClick () {
  // const response = await authService.login() as { access_token:string}
  // console.log("response: ",response)
  // if(response && response.access_token){
  //   localStorage.setItem('accessToken', response.access_token)
  // }
}

function Home() {
  console.log("Home")
  return (
    <>
    <div>
      <button onClick={onClick}>
        Home 
      </button>
    </div>
    </>
  )
}

export default Home