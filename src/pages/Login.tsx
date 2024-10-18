import { SpotifyAuthService } from "../services/SpotifyAuthService"

// TODO <a href=....> ?
const authService = new SpotifyAuthService()
async function onClick () {
  await authService.authPKCE()
  // window.location.href = 'http://localhost:3000/authenticate'
}

function Login() {

  return (
    <>
    <div>
      <button onClick={onClick}>
        Authenticate
      </button>
      { import.meta.env.VITE_REDIRECT_URI_BASE }
    </div>
    </>
  )
}

export default Login