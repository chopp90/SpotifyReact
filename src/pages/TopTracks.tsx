import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyTrackList } from "../components"
import { SpotifyTimeRange } from "../types/spotifyAPITypes"
import './TopList.scss';
import { useInView } from "react-intersection-observer";




function TopTracks() {
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
  const [leftoverTracks,setLeftoverTracks] = useState< Array<SpotifyApi.TrackObjectFull>>([])
  const [next, setNext ] = useState<Record<SpotifyTimeRange, string>>(initNexts)
  const apiService = new SpotifyApiService()

  async function fetch(timeRange: SpotifyTimeRange) {
    
    if(next[timeRange]){
      if(next[timeRange] === 'end'){
        console.warn("end of next for ",timeRange)
        return
      }

      return await apiService.get( '/me/top/tracks'
        + next[timeRange].split('/me/top/tracks')[1])as SpotifyApi.UsersTopTracksResponse 
    }
   

    return await apiService.get('/me/top/tracks', {
      time_range: timeRange,
      limit:50,
      offset:0,
    }) as SpotifyApi.UsersTopTracksResponse
  }

  async function makeLeftoverPlaylist() {

    // TODO: move userData to a context... but i failed that initially :(
    const now = new Date()
    const user = await apiService.get('/me') as SpotifyApi.UserObjectPrivate
    const playlist = await apiService.post(`/users/${user.id}/playlists`,
      {
        name: `LeftOvers: ${now}`,
        description: 'Created by filtering TopTracks: long_term against short_ and medium_term',
        public: false,
      }
    ) as SpotifyApi.CreatePlaylistResponse
    const uris = leftoverTracks.map((track)=> track.uri) 
    for( let i = 0; i<uris.length; i+= 100){
      await apiService.post(`/playlists/${playlist.id}/tracks`,
        {
          uris: uris.slice(i, Math.min(uris.length+1,i+100))
        }
      ) as SpotifyApi.AddTracksToPlaylistResponse
    }

     
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

    // going further down, more and more stuff gets filtered out
    // TODO: idea, limit the array comparison? eg only recent 50, med 100 or so?
    const leftover = tempTracks[SpotifyTimeRange.long_term].filter((long) => {
      if(
        tempTracks[SpotifyTimeRange.short_term].find((short)=> short.id === long.id) 
        ||
        tempTracks[SpotifyTimeRange.medium_term].find((short)=> short.id === long.id) 
      ){
        return false
      }
      return true
    } )
    setLeftoverTracks(leftover)
    setNext(tempNext)
  }


  
  const { ref, inView} = useInView({
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
        Object.entries(tracks).map(([timeRange,trackByTime] ,index)=> (
          <div className="spotify-top-list">
            <div className="spotify-top-list__header">
              { timeRange }
            </div>
            <SpotifyTrackList key={index} tracks={trackByTime}/>
          </div>
        ))
      }
      <div className="spotify-top-list">
        <button className="spotify-top-list__header" onClick={makeLeftoverPlaylist}>
          click me!
          </button>
      <SpotifyTrackList tracks={leftoverTracks}></SpotifyTrackList>
      </div>
    </div>
      <div ref={ref}>TODO: loading feedback... or stop indication!</div>
    </>
  )
}

export default TopTracks