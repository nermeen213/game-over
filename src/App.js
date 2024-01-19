import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar/Navbar';
import Allgames from './Components/Allgames/Allgames';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import {createHashRouter} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound'
import AllGamesContextProvider from './Components/Context/AllGamesContext';
import GameDetails from './Components/GameDetails/GameDetails';
import UserTokenProvider from './Components/Context/UserToken'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import Browser from './Components/Browser/Browser';
import Pcgames from './Components/Pcgames/Pcgames';
import Sortby from './Components/Sortby/Sortby';

let routers =createHashRouter([
  {path:'/', element: <Layout/> ,children:[
    {index:true , element:<Home/>},
    {path:'login', element:<Login/>},
    {path:'register',element:<Register/>},
    
    {path:'category/:type',element:<ProtectRoute><Categories/></ProtectRoute>},
    {path:'category/:type/gamedetails/:id',element:<ProtectRoute><GameDetails/></ProtectRoute>},
    {path:'allgames',element:<ProtectRoute><Allgames/></ProtectRoute>},
    {path:'pcgames',element:<ProtectRoute><Pcgames/></ProtectRoute>},
    {path:'pcgames/gamedetails/:id',element:<ProtectRoute><GameDetails/></ProtectRoute>},
    {path:'browser',element:<ProtectRoute><Browser/></ProtectRoute>},
    {path:'gamedetails/:id' , element:<ProtectRoute><GameDetails/></ProtectRoute>},
    {path:'allgames/gamedetails/:id' , element:<ProtectRoute><GameDetails/></ProtectRoute>},
    {path:'sortby/:sort',element:<ProtectRoute><Sortby/></ProtectRoute>},
    {path:'sortby/:sort/gamedetails/:id',element:<ProtectRoute><GameDetails/></ProtectRoute>},

    {path:'*' ,element:<NotFound/>},

  ]}
])
function App() {
 
  return <>
  <UserTokenProvider>
  <AllGamesContextProvider>
<RouterProvider router={routers}></RouterProvider>
<Toaster/>
</AllGamesContextProvider>
  </UserTokenProvider>

  

 
  
  
  </>
  
  ;
}

export default App;
