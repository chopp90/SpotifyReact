
import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyTrackList } from "../components"
import './TopList.scss';

// TODO: sortTypes isntead of string and init against typescript error
const playlistID = '1CscVbpNXaET0CA4RXNBPr'

function Playlist() {
  const [trackLists,setTrackLists] = useState<Record<string, Array<SpotifyApi.TrackObjectFull>>>({})
  
  const apiService = new SpotifyApiService()

  let playlist: SpotifyApi.SinglePlaylistResponse | undefined = undefined 

  /**
     * just assign random and sort, nothing else
     */
  function shuffleRandom() {
    let tempList = trackLists['default'].map((track)=> {
      return {
        track,
        position: Math.random()
      }
    })
    .sort((a,b)=> a.position-b.position)
    .map((track)=> track.track)

    console.log("temp",tempList)
    return tempList
    // setTrackLists({ ... trackLists, random: tempList})
  }

  function sortAlphabetically() {
    let tempList = trackLists['default'].sort((a,b) => {
      if(!a){
        return -1
      }
      if(!b){
        return -1
      }
      return a.artists[0].name.localeCompare(b?.artists[0].name)
    })
    return tempList
    // setTrackLists({ ... trackLists, alphabetically: tempList})
  }
 

  function shuffle() {
    let tempList: Record<string, Array<SpotifyApi.TrackObjectFull>> = {default: trackLists['default']}
    // const random = shuffleRandom()
    tempList = { ...tempList, random: shuffleRandom() } 
    tempList = { ...tempList, alphabetically: sortAlphabetically() } 
    setTrackLists(tempList)
  }

  async function fetchPlaylist() {

    playlist = await apiService.get(`/playlists/${playlistID}`,{
      market: 'DE',
      // fields: 'items(track(name,href,artists))'
    }) as SpotifyApi.SinglePlaylistResponse
    if(!playlist){
      return
    }
    console.log(playlist)
    const tracks = playlist?.tracks?.items?.filter((item)=>!!item.track).map((item)=>item.track!) || []
    console.log("tracks",tracks)
    setTrackLists( { default: tracks})
    console.log(trackLists['default'])
  }

  async function updateOrder(type: string) {
    const response = await apiService.put(`/playlists/${playlistID}/tracks`,{
      uris: trackLists[type].map((track)=> track?.uri)
    })
    console.log(response)
  }

  useEffect(()=> {
    fetchPlaylist()
  }, [])

  return (
    <> 
      <button className="spotify-top-list__header" onClick={shuffle}>
       click me!
      </button>
      <div className="spotify-top-lists">
        {/* <div> { Object.entries(next).map((entry)=> (<div>{entry}</div>)) } </div> */}
        { 
          Object.entries(trackLists).map(([type,tracks] ,index)=> (
            <div className="spotify-top-list">
              <button className="spotify-top-list__header" onClick={() => updateOrder(type)}>
                { type }
              </button>
              <SpotifyTrackList key={index} tracks={tracks}/>
            </div>
          ))
        }
        <div className="spotify-top-list">
         
        </div>
      </div>
    </>
  )
}

export default Playlist