// import { useContext} from "react"
// import { UserContext } from "../App"

import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"



function Profile() {
  // const { user } = useContext(UserContext)!
  const apiService = new SpotifyApiService()
  const [user,setUser] = useState<SpotifyApi.UserObjectPrivate>()

  async function fetch(){
    
    const response = await apiService.get('/me') as SpotifyApi.UserObjectPrivate
    setUser(response)
    console.log(Object.entries(response))
    Object.entries(response).map(([entry,value])=>{
      console.log(entry,value)
    })
  }

  useEffect(()=>{
    fetch()
  },[])


  return (
    <>
    
    {/* { JSON.stringify(user)} */}
    { user ? Object.entries(user).map(([entry,value])=> (
      <div>{entry} : {JSON.stringify(value)}</div>
    ))
  :<div>abc</div>
  }
    </>
  )
}

export default Profile