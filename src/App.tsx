import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.scss';
import DefaultLayout from './layouts/DefaultLayout';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './pages/Callback';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
// import { createContext, useState } from 'react';
import Playlist from './pages/Playlist';
import PlaylistPopulate from './pages/PlaylistPopulate';

// export const UserContext = createContext<[
//    SpotifyApi.UserObjectPrivate|null,
//     React.Dispatch<React.SetStateAction<SpotifyApi.UserObjectPrivate | null > > 
//  ] | undefined >(undefined)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< DefaultLayout />}>
      {/* Define child routes here */}
      <Route index element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/topArtists" element={<TopArtists />} />
      <Route path="/topTracks" element={<TopTracks />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/playlistPopulate" element={<PlaylistPopulate />} />
    </Route>
  ), {basename: '/SpotifyReact'}
);

function App() {
  // const [user, setUser] = useState<SpotifyApi.UserObjectPrivate | null>(null);
  // const userState = useState<SpotifyApi.UserObjectPrivate | null>(null);
  
  return (
    // <UserContext.Provider value={{ user, setUser }}>
    // <UserContext.Provider value={userState}>
      <RouterProvider router={router} />
    // </UserContext.Provider>
  );
}

export default App;
