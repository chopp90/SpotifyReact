import { useEffect } from "react";
import { SpotifyAuthService } from "../services/SpotifyAuthService"
import { useLocation, useNavigate } from 'react-router-dom';
// import { UserContext } from "../App";

const authService = new SpotifyAuthService()

function Callback() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get('code');
  const navigate = useNavigate()
    useEffect(()=> {
    const getToken = async (authorizationCode: string) => {
      try{
        const response = ( await authService.getToken(authorizationCode)) as { access_token: string}
        if(response.access_token.length){
          sessionStorage.setItem('accessToken', response.access_token )
          
          // if(!user){
          //   const response =  await apiService.get('/me') as SpotifyApi.UserObjectPrivate
          //   if(response){
          //     console.log("response", response)
          //     console.log("setUser",setUser)
          //     setUser(response)
          //   }
          // }

          navigate('/home')
        }else{
          throw new Error('No response.access_token.length'+ response)
        }
      }catch(error){
        console.log("error in getToken",error)
      }
    }

    // The "old" auth method that doesn't have good permissions/scope
    if(authorizationCode){
      getToken(authorizationCode)
    }
  }, [])

  return (
    <>
    <div>
      Callback Page, should not be visibile for long, just landing here after spotify authentication to send the code over to a BE request, saving the auth token in localestorage and redirecting away
    </div>
    </>
  )
}

export default Callback