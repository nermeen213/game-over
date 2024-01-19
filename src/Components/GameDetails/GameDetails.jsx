import React, { useContext, useEffect, useState } from 'react';
import style from './GameDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { allGamesContext } from '../Context/AllGamesContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {RotatingLines} from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function GameDetails() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:1000,
      };
    let {getDetailsGames}=useContext(allGamesContext)
    let params =useParams();
    const [gameDetails, setgameDetails] = useState(null)
    async function getDetails(Id){
        try {
            let{data}=await getDetailsGames(Id);
            setgameDetails(data)
        
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(() => {
        getDetails(params.id)
    }, [])

    return (
        <>
        <Helmet>
            <title>Details of Game</title>
        </Helmet>
        <div className='my-5 bg' id="background">
           {gameDetails?  <div className="row">
                <div className="col-md-5">
                    <img src={gameDetails.thumbnail} className='w-100' alt="" />
                      <div className='my-4 d-flex justify-content-between '>
                       <a href={gameDetails.freetogame_profile_url} target='_blank'>
                         <button className='btn btn-outline-warning'>Free </button>
                       </a>
                       <a href={gameDetails.game_url} target='_blank'>
                        <button className='btn background '>
                            Download Nom
                        </button>
                       </a>
                      </div>
                </div>
                <div className="col-md-7">
                    <div className='text-white'>
                        <h2 className='text-warning'>{gameDetails.title}</h2>
                        <p className='lead fs-5'>{gameDetails.description}</p>
                        <hr />
                        <div>
                            <h3 className='text-warning'>Online Screeshot</h3>
                            {gameDetails? <div>
                                <Slider {...settings}>
                                {gameDetails.screenshots.map((image,indx)=><div>
                                    <img src={image.image} alt="" className='w-100'/>
                                </div>)}
                                </Slider>
                                

                            </div>:""
                                }
                            <div>
                                <h5 className='icon'>Title: <span className='spanDet text-white fw-light   '>{gameDetails.title}</span></h5>
                                <h5 className='icon'>platform: <span className='spanDet text-white fw-light '>{gameDetails.platform}</span></h5>
                                <h5 className='icon'>developer: <span className='spanDet text-white fw-light '>{gameDetails.developer}</span></h5>
                                <h5 className='icon'>release_date: <span className='spanDet text-white fw-light '>{gameDetails.release_date}</span></h5>
                                <h5 className='icon'>genre: <span className='spanDet text-white fw-light '>{gameDetails.genre}</span></h5>
                                <h5 className='icon'>publisher: <span className='spanDet text-white fw-light '>{gameDetails.publisher}</span></h5>
                               
                            </div>
                          

                        </div>
                    </div>
                </div>
            </div>:<div className='w-100 d-flex align-items-center justify-content-center '>
                           <RotatingLines
  visible={true}
  height="70"
  width="70"
  color="red"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>}
        </div>
           
        </>
    )
}
