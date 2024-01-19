import React, { useContext, useState,useEffect } from 'react';
import style from './Allgames.module.css';
import { allGamesContext } from '../Context/AllGamesContext';
import {RotatingLines} from 'react-loader-spinner'

import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
export default function Allgames() {
    let{allGames,getDetailsGames}=useContext(allGamesContext)
    const [allGame, setallGame] = useState(null)
    let container=[];
    async function getALLGames(){
        try {
            let{data}= await allGames()
            let arr1 =data.slice(0,100)
        //    console.log(data[3].toLowerCase().includes(  'game' ));
           setallGame(arr1)
        //    container.push(data)
        //    console.log(container);
        } catch (error) {
            console.log(error);
        }
     
    }
    useEffect(() => {
        getALLGames()
    }, [])
    async function getDetails(GameId){
        let {data}= await getDetailsGames(GameId)
        
       
     }

    return (
        <>
       <Helmet>
      <meta name="description" content="" />
       <title>ALL Games</title>
       </Helmet>

       
       {allGame? <div className='py-5'>
        <div className="row g-4 ">
            {allGame.map((game,indx)=><div key={indx} className="col-lg-3 col-md-6">
                <div className='card-border rounded-3 '>
                <Link onClick={()=>getDetails(game.id)} to={`gamedetails/${game.id}`}>
                    <img src={game.thumbnail} className='w-100 rounded-3  ' alt="" />
                    <div className='d-flex justify-content-between  align-items-center p-3'>
                        <h6 className='text-white'>{game.title}</h6>
                        <a href={game.freetogame_profile_url} target='_blank'>
                         <button className='btn btn-outline-warning'>Free </button>
                       </a>
                    </div>
                    <p className='px-2 details'>{game.short_description.split(" ").slice(0,7).join(' ')}</p>
                    <div className='d-flex align-items-center justify-content-between mx-2'>
                            <h6 className='layer font-all p-2 text-warning '>{game.genre}</h6>
                            <h6 className='layer font-all p-2 icon'>{game.platform}</h6>
                        </div>
                        </Link>
                </div>
                </div>)}
                {/* <button className='text-center btn-outline-info btn w-25 mx-auto'>more</button> */}
        </div>
           

          

           </div>:<div className='w-100 d-flex align-items-center justify-content-center '>
                           <RotatingLines
  visible={true}
  height="70"
  width="70"
  color="white"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>}
           
        </>
    )
}
