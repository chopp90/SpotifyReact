
import { useEffect, useState } from "react"
import { SpotifyApiService } from "../services/SpotifyApiService"
import { SpotifyArtistList, SpotifyTrackList } from "../components"
import './TopList.scss';

// TODO: sortTypes isntead of string and init against typescript error
const playlistID = '7yaAhcmYp21NkhXrVGFo0f'

function PlaylistPopulate() {
  const [trackLists,setTrackLists] = useState<Record<string, Array<SpotifyApi.TrackObjectFull>>>({})
  const [artistList,setArtistList] = useState<Array<SpotifyApi.ArtistObjectFull>> ([])
  const apiService = new SpotifyApiService()

  let playlist: SpotifyApi.SinglePlaylistResponse | undefined = undefined 

  async function fetchPlaylist() {

    playlist = await apiService.get(`/playlists/${playlistID}`,{
      market: 'DE',
    }) as SpotifyApi.SinglePlaylistResponse
    if(!playlist){
      return
    }
    const tracks = playlist?.tracks?.items?.filter((item)=>!!item.track).map((item)=>item.track!) || []
    setTrackLists( { default: tracks})

    // TODO: unique entries for artists, no repeats if multiple songs!
    const artistIds = tracks.map((track) => {
      let ids = '' 
      track?.artists.forEach((artist,index)=> ids += (index === 0 ? '' : ',') + artist.id )
      return ids
    }).join(',')
    const tempArtists = await apiService.get(`/artists?ids=${artistIds}`) as SpotifyApi.MultipleArtistsResponse
    setArtistList(tempArtists.artists)

    // TODO: also do something with newest album?   are single releases there?
    let promises : Array<Promise<SpotifyApi.ArtistsTopTracksResponse>> = []
    artistList.forEach(async (artist) => {
      promises.push(apiService.get(`artists/${artist.id}/top-tracks`) as Promise<SpotifyApi.ArtistsTopTracksResponse> )
      // const response = await apiService.get(`artists/${artist.id}/top-tracks`) as SpotifyApi.ArtistsTopTracksResponse
      // // tempList = [...tempList,response.tracks]
      // console.log(response.tracks)
      // tempList = tempList.concat(response.tracks)
      // console.log(tempList)
    })
    const responses = await Promise.all(promises)
    let generatedList: Array<SpotifyApi.TrackObjectFull> = []
    
    responses.forEach((tracks: SpotifyApi.ArtistsTopTracksResponse)=>{
      generatedList = generatedList.concat(tracks.tracks)
    })
    let tempList: Record<string, Array<SpotifyApi.TrackObjectFull >> = {default: trackLists['default']}
    tempList = {...tempList, generated: generatedList}
    console.log("tempList")
    setTrackLists(tempList)
    console.log(trackLists)


  }


  async function updatePlaylist() {
    const response = await apiService.put(`/playlists/${playlistID}/tracks`,{
      uris: trackLists['generated'].map((track)=> track?.uri)
    })
    console.log(response)
     
  }


  useEffect(()=> {
    fetchPlaylist()
  }, [])

  return (
    <> 
      {/* <button className="spotify-top-list__header" onClick={shuffle}>
       click me!
       
      </button> */}
      <button onClick={updatePlaylist}> Send it!</button>
      
      <div className="spotify-top-lists">
        
        {/* <div> { Object.entries(next).map((entry)=> (<div>{entry}</div>)) } </div> */}
        { 
          Object.entries(trackLists).map(([type,tracks] ,index)=> (
            <div className="spotify-top-list">
              <div>
                {type}
              </div>
              {/* <button className="spotify-top-list__header" onClick={() => updateOrder(type)}>
                { type }
              </button> */}
              <SpotifyTrackList key={index} tracks={tracks}/>
            </div>
          ))
        }
        <SpotifyArtistList artists={artistList}></SpotifyArtistList>
      </div>
    </>
  )
}

export default PlaylistPopulate