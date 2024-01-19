import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
export let allGamesContext=createContext();

export default function AllGamesContextProvider(props) {
  
    
    let headers ={'X-RapidAPI-Key':
    'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}

function allGames(){
    return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games` ,{
        headers
    }).then((res)=>res).catch((err)=>err);
}
function getDetailsGames(GameId){
    return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${GameId}`,
    {
        headers
    }).then((res)=>res).catch((err)=>err);
}
function getPcGames(pc){
    return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${pc}`,
    {headers}).
    then((res)=>res).catch((err)=>err);
}

function getCategoryies(category){
    return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
     {headers}
    ).then((res)=>res).catch((err)=>err);
}
function getSorts(sort){
    return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sort}`,
     {headers}
    ).then((res)=>res).catch((err)=>err);
}


    return (
        <>
        <allGamesContext.Provider value={{headers,getSorts,allGames,allGamesContext,getDetailsGames,getCategoryies ,getPcGames}}>
        {props.children}
        </allGamesContext.Provider>
            
        </>
    )
}
