import { SpotifyAuthService } from "../services/SpotifyAuthService"

// TODO <a href=....> ?
const authService = new SpotifyAuthService()
async function onClick () {
  await authService.authPKCE()
}

async function refreshToken () {
  await authService.refreshToken()
}

function Login() {

  return (
    <>
    <div>
      <button onClick={onClick}>
        Authenticate
      </button>
      <button onClick={refreshToken}>
        RefreshTokenTest
      </button>
    </div>
    </>
  )
}

export default Login