import React, { useContext, useEffect, useState } from 'react';
import style from './Categoryslider.module.css';
import { allGamesContext } from '../Context/AllGamesContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  Link, useNavigate } from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function Categoryslider() {
    let Navigate=useNavigate();
   
  
     
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:1000,
      };
      
    
      
     
    
    const [gamesData, setgamesData] = useState(null)
    const [mostGame, setmostGame] = useState(null)
    let{allGames , getDetailsGames}=useContext(allGamesContext)
    async function getAllGames(){
        try {
            let {data}= await allGames()
            let arr =data?.slice(0,17)
            let arr2 =data?.slice(18,42)
            setgamesData(arr)
            setmostGame(arr2)
           
        } catch (error) {
            console.log(error);
        }
   
   
 }
 useEffect(() =>{
    getAllGames()
 } , [])



 async function getDetails(GameId){
   
        let {data}= await getDetailsGames(GameId);
   
 }
 
    return (
        <>
         <Helmet>
            <title>Game over</title>
        </Helmet>
           <div className='categories-slider p-4'>
            <h5 className='text-light pb-3 '><i className="fa-solid fa-gamepad fs-4 icon"></i> Personalized Recommendations</h5>

            {gamesData? <div className=''>
           <Slider {...settings}>
           {gamesData.map((photo , index1)=><>
            <div key={index1} className='position-relative mx-2'>
                <Link onClick={()=>getDetails(photo.id)} to={`gamedetails/${photo.id}`}>
                <img src={photo.thumbnail} className="w-100  rounded-3 slider-font"  alt="" />
           
           <div className="layer position-absolute top-0 bottom-0 end-0 rounded-3    w-100 d-flex align-items-center justify-content-end  flex-column ">
               <h6 className='text-light fs-5 fw-bolder px-2 font-home'>{photo.title.split(" ").slice(0,3).join(" ")}</h6>
               <h6 className=' text-warning'>{photo.genre}</h6>
           </div>
                </Link>
          
            </div>
            
      </>
      )}
      </Slider>
      
    </div>
    
    :""}
           
           </div>


           <div className="my-5">
            <h4 className='text-light mb-4 '><i className="fa-solid fa-dice icon me-2"></i>Most Play</h4>
            <div className="row gx-5 gy-4 ">
                {mostGame?.map((game ,index)=> <div className="col-md-4 text-light " key={index}>
                <Link onClick={()=>getDetails(game.id)} to={`gamedetails/${game.id}`}>
                    <div className='card-border  rounded-3'>
                    <img src={game.thumbnail} className='w-100' alt="" />
                    <div className='p-2'>
                        <h5 className='pt-2 text-light'>{game.title}</h5>
                        <p className='details'>{game.short_description.split(" ").slice(0,5).join(" ")}</p>
                        <div className='d-flex align-items-center justify-content-between '>
                            <h6 className='layer p-2 text-warning '>{game.genre}</h6>
                            <h6 className='layer p-2 icon'>{game.platform}</h6>
                        </div>

                    </div>
                    </div>
                    </Link>
                   
                    
                   

                   </div>)}
               
            </div>
           </div>
        </>
    )
}
