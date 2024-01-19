import React, { useEffect } from 'react';
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useContext } from 'react';
import { userToken } from '../Context/UserToken';


export default function Layout() {
    let {Token , setToken}=useContext(userToken)
    useEffect(()=>{
        if(localStorage.getItem('newToken')!==null)
        setToken(localStorage.getItem('newToken'))
    },[])

    return <>


    <Navbar/>
    <div className="container special">
    <Outlet></Outlet>
    </div>
   
    
    </>
       
   
}
