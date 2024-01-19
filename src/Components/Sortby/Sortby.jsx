import React, { useContext, useState } from 'react';
import style from './Sortby.module.css';
import { Link, useParams } from 'react-router-dom';
import { allGamesContext } from '../Context/AllGamesContext';
import { useQuery } from 'react-query';
import { RotatingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Sortby() {
    const [getsort, setgetsort] = useState(null)
    let { getDetailsGames ,getSorts}=useContext(allGamesContext);
    let {sort}=useParams();

   async function getSortGames(sort){
    try {
        let{data}=await getSorts(sort)
        setgetsort(data)
    } catch (error) {
        console.log(error);
    }
    

    }
  getSortGames(sort)



    async function getalldetails(id){
        await getDetailsGames(id)
    }
    return (
        <>
         <Helmet>
            <title>Sort of Game</title>
        </Helmet>
           {getsort? <div className='py-5'>
        <div className="row g-4 ">
            {getsort.map((game,indx)=><div key={indx} className="col-lg-3 col-md-6">
                <div className='card-border rounded-3 '>
                <Link  to={`gamedetails/${game.id}`} onClick={()=>getalldetails(game.id)}>
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
