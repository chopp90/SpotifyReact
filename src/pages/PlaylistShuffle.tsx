
import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyPlaylistCard, SpotifyTrackList } from "../components"
import './TopList.scss';
import { useParams } from "react-router-dom";

// TODO: sortTypes isntead of string and init against typescript error

function PlaylistShuffle() {
  const [playlist,setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse | undefined>(undefined)
  const [trackLists,setTrackLists] = useState<Record<string, Array<SpotifyApi.TrackObjectFull>>>({})
  const playlistID = useParams().id || '1CscVbpNXaET0CA4RXNBPr'
  console.log("playlistID",playlistID)
  
  const apiService = new SpotifyApiService()

  /**
     * just assign random and sort, nothing else
     */
  function shuffleRandom() {
    const tempList = trackLists['default'].map((track)=> {
      return {
        track,
        position: Math.random()
      }
    })
    .sort((a,b)=> a.position-b.position)
    .map((track)=> track.track)

    return tempList
    // setTrackLists({ ... trackLists, random: tempList})
  }

  function sortAlphabetically() {
    const tempList = trackLists['default'].slice().sort((a,b) => {
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
    console.log("trackLists",trackLists)
    // const random = shuffleRandom()
    tempList = { ...tempList, random: shuffleRandom() } 
    tempList = { ...tempList, alphabetically: sortAlphabetically() } 
    setTrackLists(tempList)
    console.log("tempList",tempList)
  }

  async function fetchPlaylist() {

    const response=  await apiService.get(`/playlists/${playlistID}`,{
      market: 'DE',
      // fields: 'items(track(name,href,artists))'
    }) as SpotifyApi.SinglePlaylistResponse
    if(!response){
      return
    }
    const tracks = response?.tracks?.items?.filter((item)=>!!item.track).map((item)=>item.track!) || []
    setPlaylist(response)
    setTrackLists( { default: tracks})
  }

  async function updateOrder(type: string) {
    const response = await apiService.put(`/playlists/${playlistID}/tracks`,{
      uris: trackLists[type].map((track)=> track?.uri)
    })
    console.log(response)
  }

  useEffect(()=> {
    fetchPlaylist()
  },[])

  return (
    <> 
      <div className="spotify-top-lists__header">
        {playlist &&
        <SpotifyPlaylistCard playlist={playlist} index={-1} clicked={()=>{}}></SpotifyPlaylistCard>
        }
        <button className="spotify-top-lists__header--button" onClick={shuffle}>
          do the shuffle-ing!
        </button>
      </div>
      <div className="spotify-top-lists">
        {/* <div> { Object.entries(next).map((entry)=> (<div>{entry}</div>)) } </div> */}
        { 
          Object.entries(trackLists).map(([type,tracks] ,index)=> (
            <div className="spotify-top-list">
              <button className="spotify-top-list__header button-update" onClick={() => updateOrder(type)}>
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

export default PlaylistShuffle