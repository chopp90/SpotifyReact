import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import DemoViteReact from './pages/DemoViteReact';
import Empty from './pages/Empty';
import DefaultLayout from './layouts/DefaultLayout';
import Profile from './pages/Profile';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< DefaultLayout />}>
      {/* Define child routes here */}
      <Route index element={<Home />} />
      <Route path="/demo" element={<DemoViteReact />} />
      <Route path="/empty" element={<Empty />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
