import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import DemoViteReact from './pages/DemoViteReact';
import Empty from './pages/Empty';
import HeaderNavigation from './Components/HeaderNavigation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< HeaderNavigation />}>
      {/* Define child routes here */}
      <Route index element={<DemoViteReact />} />
      <Route path="/empty" element={<Empty />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
