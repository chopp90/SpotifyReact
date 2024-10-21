import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyArtistList } from "../components"
import { SpotifyTimeRange } from "../types/spotifyAPITypes"
import './TopList.scss';
import { useInView } from "react-intersection-observer";




function TopArtists() {
  const initArtists: Record<SpotifyTimeRange, Array<SpotifyApi.ArtistObjectFull>> = {
    [SpotifyTimeRange.short_term] : [],
    [SpotifyTimeRange.medium_term] : [],
    [SpotifyTimeRange.long_term] : []
  }
  //TODO: do nicer? especially initNextx, maybe some [fance key in enum] stuff?
  const initNexts: Record<SpotifyTimeRange,string> = {
    [SpotifyTimeRange.short_term] : '',
    [SpotifyTimeRange.medium_term] : '',
    [SpotifyTimeRange.long_term] : ''
  }
  const [artists,setArtists] = useState<Record<SpotifyTimeRange, Array<SpotifyApi.ArtistObjectFull>>>(initArtists)
  const [next, setNext ] = useState<Record<SpotifyTimeRange, string>>(initNexts)
  const apiService = new SpotifyApiService()

  async function fetch(timeRange: SpotifyTimeRange) {
    
    if(next[timeRange]){
      if(next[timeRange] === 'end'){
        console.warn("end of next for ",timeRange)
        return
      }
      return await apiService.get( '/me/top/artists'
        + next[timeRange].split('/me/top/artists')[1])as SpotifyApi.UsersTopArtistsResponse 
    }
   

    return await apiService.get('/me/top/artists', {
      time_range: timeRange,
      limit:20,
      offset:0,
    }) as SpotifyApi.UsersTopArtistsResponse
  }


  async function fetchAll() {
    // TODO: feels wrong, do better?
    const tempArtists = { ...artists}
    const tempNext = {...next}
    for(const key of Object.values(SpotifyTimeRange)){
      const result = await fetch(SpotifyTimeRange[key])
      if(!result) {
        continue
      }

      const tempArtist = [ ...artists[key].concat(result.items)]
      tempArtists[key] = tempArtist
      tempNext[key] = result.next || 'end'
    }
    setArtists(tempArtists)
    setNext(tempNext)
  }


  
  const { ref, inView } = useInView({
    threshold: 0,
  });
  
  useEffect(() => {
    fetchAll()
  }, [inView])

  return (
    <>
    <div className="spotify-top-lists">
      {/* <div> { Object.entries(next).map((entry)=> (<div>{entry}</div>)) } </div> */}
      { 
        Object.values(artists).map((artistByTime,index)=> (
          <SpotifyArtistList key={index} artists={artistByTime}/>
        ))
      }
    </div>
      <div ref={ref}>TODO: loading feedback... or stop indication!</div>
    </>
  )
}

export default TopArtists