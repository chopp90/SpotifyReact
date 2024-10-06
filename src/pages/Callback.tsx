import { useEffect } from "react";
import { SpotifyAuthService } from "../services/SpotifyAuthService"
import { redirect, useLocation, useNavigate } from 'react-router-dom';

const authService = new SpotifyAuthService()

function Callback() {
  console.log("Callback")
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get('code');
  const navigate = useNavigate()

  useEffect(()=> {
    const getToken = async (authorizationCode: string) => {
      try{
        const response = ( await authService.getToken(authorizationCode)) as { access_token: string}
        console.log("response",response)
        if(response.access_token.length){
          localStorage.setItem('accessToken', response.access_token )
          console.log("storing", response.access_token)
          navigate('/home')
        }else{
          throw new Error('No response.access_token.length'+ response)
        }
      }catch(error){
        console.log("error in getToken",error)
      }
    }

    if(authorizationCode){
      getToken(authorizationCode)
    }
  })

  return (
    <>
    <div>
      Callback Page, should not be visibile for long, just landing here after spotify authentication to send the code over to a BE request, saving the auth token in localestorage and redirecting away
    </div>
    </>
  )
}

export default Callback