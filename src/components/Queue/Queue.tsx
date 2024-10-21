import { useEffect, useState } from 'react';
import { SpotifyApiService } from '../../services/SpotifyApiService';
import './Queue.scss';
import SpotifyTrackCard from '../SpotifyTrackCard/SpotifyTrackCard';

export type NavigationItem = {
  name: string, 
  url: string,
}

function Queue() {
  const apiService = new SpotifyApiService()
  const [showQueue, setShowQueue] = useState<boolean>(false)
  const [tracks,setTracks] = useState<Array<SpotifyApi.TrackObjectFull>>([])
  const [current,setCurrent] = useState<SpotifyApi.TrackObjectFull>()

  async function  fetchQueue() {
    const result = await apiService.get('/me/player/queue') as SpotifyApi.UsersQueueResponse
    setCurrent(result.currently_playing as SpotifyApi.TrackObjectFull)
    setTracks(result.queue as Array<SpotifyApi.TrackObjectFull>)
  }

  function onClick(){
    setShowQueue(!showQueue)
    if(!showQueue){
      fetchQueue()
    }
  }

  useEffect(()=>{
    fetchQueue()
  })

  return (
    <>
      <div className="queue__container">
        <button onClick={()=>onClick()} className='queue__button'>
          Queue
        </button>
        { !showQueue?
          <></>
          :
          
          <div className="queue__popup">
            <div className="queue__popup--current">
              Currently Playing
              { !!current &&
                <SpotifyTrackCard key={'current'} track={current!} index={-1}/>
              }
             
             </div>
           
           <div className="queue__popup--text">
            Queue
            </div>
            { tracks.map((track,index)=> (
              <SpotifyTrackCard key={index} track={track} index={index}/>
              ))
            }
          </div>
        }
      </div>
    </>
    
  )
}

export default Queue