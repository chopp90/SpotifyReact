import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Callback from './pages/Callback';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';

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
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
