import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyTrackList } from "../components"
import { SpotifyTimeRange } from "../types/spotifyAPITypes"
import './TopList.scss';
import { useInView } from "react-intersection-observer";




function Profile() {
  const initTracks: Record<SpotifyTimeRange, Array<SpotifyApi.TrackObjectFull>> = {
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
  const [tracks,setTracks] = useState<Record<SpotifyTimeRange, Array<SpotifyApi.TrackObjectFull>>>(initTracks)
  const [next, setNext ] = useState<Record<SpotifyTimeRange, string>>(initNexts)
  const apiService = new SpotifyApiService()

  async function fetch(timeRange: SpotifyTimeRange) {
    console.log("fetch:", timeRange, next)
    //TODO: check for end of nexts?
    
    if(next[timeRange]){
      if(next[timeRange] === 'end'){
        console.warn("end of next for ",timeRange)
        return
      }
      console.log("next,timeRange:", next[timeRange])
      return await apiService.get( '/me/top/tracks'
        + next[timeRange].split('/me/top/tracks')[1])as SpotifyApi.UsersTopTracksResponse 
    }
   

    return await apiService.get('/me/top/tracks', {
      time_range: timeRange,
      limit:50,
      offset:0,
    }) as SpotifyApi.UsersTopTracksResponse
  }


  async function fetchAll() {
    // TODO: feels wrong, do better?
    const tempTracks = { ...tracks}
    const tempNext = {...next}
    for(const key of Object.values(SpotifyTimeRange)){
      const result = await fetch(SpotifyTimeRange[key])
      if(!result) {
        continue
      }

      const tempTrack = [ ...tracks[key].concat(result.items)]
      tempTracks[key] = tempTrack
      tempNext[key] = result.next || 'end'
    }
    setTracks(tempTracks)
    setNext(tempNext)
  }


  
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  
  useEffect(() => {
    console.log("useEffect",inView, entry)
    fetchAll()


  }, [inView])

  return (
    <>
    <div className="spotify-top-list">
      {/* <div> { Object.entries(next).map((entry)=> (<div>{entry}</div>)) } </div> */}
      { 
        Object.values(tracks).map((trackByTime,index)=> (
          <SpotifyTrackList key={index} tracks={trackByTime}/>
        ))
      }
    </div>
      <div ref={ref}>TODO: loading feedback... or stop indication!</div>
    </>
  )
}

export default Profile