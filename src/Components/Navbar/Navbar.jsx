import React, { useContext } from 'react';
import style from './Navbar.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/logo (3).png'
import { userToken } from '../Context/UserToken';
import { allGamesContext } from '../Context/AllGamesContext';

export default function Navbar() {
  
  let container =[];
  let Navigate=useNavigate();
    let{Token ,setToken}=useContext(userToken);
    let{getPcGames ,getDetailsGames,getCategoryies,allGames,getSorts}=useContext(allGamesContext);
    
    // **************************logout**************************
     function Logout(){
      setToken(null)
      localStorage.removeItem('newToken')
       Navigate('/login')

     }

    // **************************logout**************************

function Platform(){
  document.getElementById('platform').classList.toggle('d-none')

}
function category(){
  document.getElementById('category').classList.toggle('d-none')

}
function sortby(){
  document.getElementById('sortby').classList.toggle('d-none')

}


// async function getDetails(){
//   let {data}= await getDetailsGames(GameId)
//   console.log(data);
//   console.log('hello');
  
 
// }
    // **************************search**************************

async function getData(){
  let searchInput=document.getElementById('input')
  let searchDiv=document.getElementById('search-div')




  
  searchDiv.classList.remove('d-none')
    let{data}=await allGames()
    var term =searchInput.value.toLowerCase();
    let box ='';
    for(let i=0 ; i<data.length ;i++){   
      if(data[i].title.toLowerCase().includes( term)){
       box+=`
       
       <div class="row background p-2 m-1"  >
       <div class="col-sm-3 ">
      <img src=${data[i].thumbnail} class="w-100 rounded-2"  alt=''/>
      </div>
      <div class="col-sm-9">
      <h6 className="fw-bolder fs-5 ">${data[i].title}</6>
      <div class="d-flex align-content-center justify-content-between mt-2 ">
      <p className="f6-6 details">${data[i].short_description.split(" ").slice(0,3).join(' ')}....</p>
      <h6>${data[i].platform}</h6>
      </div>
      </div>
      
      </div>
       
       `
      
      }
     
    
      
    }
    if(searchInput.value==""){
      searchDiv.classList.add('d-none')
    }
    searchDiv.innerHTML=box;
}


async function getpcgames(pc){
  try {
      let{data}=await getPcGames(pc)
      console.log(data);
  } catch (error) {
      console.log(error);
  }
     
  }
async function getsortgames(sort){
  try {
      let{data}=await getSorts(sort)
      console.log(data);
  } catch (error) {
      console.log(error);
  }
     
  }
  

 
    
    return <>
    <nav className="navbar  navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand d-flex align-items-center justify-content-center me-5 " to="/">
        <img src={logo} alt="Logo" className='main-logo'/>
        <h1 className='h6 font mb-0 ms-1 fon-type'>GameOver</h1>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
   
    <div className="collapse navbar-collapse  " id="navbarSupportedContent">
     <div className='position-relative'>
     <input type="text" className='form-control w-100 ' id="input" placeholder="Search by name..." onInput={()=>getData()}/>
     <div className=' position-absolute' id="search-div">
     

     </div>
     </div>
    
      <ul className="navbar-nav me-auto  mb-lg-0 ">
      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/"></Link>
        </li>
        {Token?<>
          <li className="nav-item">
          <Link className="nav-link" to="/allgames">All Games</Link>
        </li>
        <li className="nav-item text-white d-flex align-items-center position-relative"  onClick={()=>Platform()}>
        <h6 className='m-0 p-0 cursor'> plateform <span className=''><i class="fa-solid fa-caret-down "></i></span></h6>
          <div  id="platform" className='sub-menu position-absolute top-100 start-0 d-none rounded-3 bg-light px-4 py-3 mt-1 '>
              <Link to={'/pcgames'} onClick={()=>getpcgames('pc')}><h5>PC(windows)</h5></Link>
              <Link to={'/browser'}  onClick={()=>getpcgames('browser')}><h5>Web Browser</h5></Link>
             
          </div>
        </li>
       
        <li className="nav-item text-white d-flex align-items-center position-relative " onClick={()=>category()}>
        <h6 className='m-0 p-0 cursor'>Categories <span className=''><i class="fa-solid fa-caret-down "></i></span></h6>
          <div  id="category" className='sub-menu position-absolute top-100 start-0 d-none rounded-3 bg-light px-4 py-2 mt-1 '>
              <Link to={`category/${'racing'}`} onClick={()=>getCategoryies('racing')}><h5>racing</h5></Link>
              <Link to={`category/${'shooter'}`} onClick={()=>getCategoryies('shooter')} ><h5>Shooter</h5></Link>
              <Link to={`category/${'sports'}`} onClick={()=>getCategoryies('sports')}><h5>Sports</h5></Link>
              <Link to={`category/${'social'}`} onClick={()=>getCategoryies('social')}><h5>Social</h5></Link>
              <Link to={`category/${'open-world'}`} onClick={()=>getCategoryies('open-world')} ><h5>Open-World</h5></Link>
              <Link to={`category/${'fantasy'}`} ><h5>Fantisy</h5></Link>
              <Link to={`category/${'action'}`} ><h5>Action-rpg</h5></Link>
              <Link to={`category/${'battle-royale'}`} ><h5>battle-royal</h5></Link>
             
             
          </div>
        </li>
        <li className="nav-item text-white d-flex align-items-center position-relative"  onClick={()=>sortby()}>
        <h6 className='m-0 p-0 cursor'> Sort by <span className=''><i class="fa-solid fa-caret-down "></i></span></h6>
          <div  id="sortby" className='sub-menu position-absolute top-100 start-0 d-none rounded-3 bg-light px-4 py-3 mt-1 '>
              <Link to={`/sortby/${'popularity'}`} onClick={()=>getsortgames('popularity')}><h5>Popularity</h5></Link>
              <Link to={`/sortby/${'alphabetical'}`} onClick={()=>getsortgames('alphabetical')}><h5>alphabetical</h5></Link>
             
          </div>
        </li>
        </>:""}
       
       
      
      </ul>
     
      <ul className='d-flex align-items-center mb-0 ms-auto button-ul'>
        {Token?<>
          <li className='mx-2 log'onClick={()=>Logout()} >
          <button className='btn  btn-outline-warning'>LogOut</button>
        </li>
        </>:<>
        <li className='mx-2'>
         <Link to='/register'> <button className='btn btn-outline-light '>Join us</button></Link>
        </li>
        <li className='mx-2'>
         <Link to="/login"> <button className='btn btn-outline-warning'>Login</button></Link>
        </li>
        </>}
       
        
        
      </ul>
      
    </div>
  </div>
</nav>
   

           
        </>
    
}
