import React, { useContext, useEffect } from 'react';
import style from './Home.module.css';

import axios from 'axios'
import { allGamesContext } from '../Context/AllGamesContext';
import Categoryslider from '../Categoryslider/Categoryslider';


export default function Home() {
   
   
    return (
        <>
           <div className='text-center title-div p-5 text-light mb-5'>
           <h1 >Find & track the best <span className='span-font'>free-to-play</span> games!</h1>
            <p>Track what you've played and search for what to play next! Plus get free premium loot!</p>
           </div>
           <Categoryslider/>
            
        </>
    )
}
