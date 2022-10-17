import React, { useEffect, useState } from 'react';
import Detail from '../Detail';
import './Style.css';
import Weathercard from './Weathercard';


const Condition =()=> {
const[serachValue, setsearchValue]= useState("Modinagar");
 const [tempInfo, setTempInfo] = useState({});
 

const getWeatherInfo =async()=>{
    try {
        let url=
`https://api.openweathermap.org/data/2.5/weather?q=${serachValue}&units=metric&appid=a74fe20ef75d699366286f1d074a969d`;

let res= await fetch(url)
let data=await res.json();

const {temp,humidity,pressure}=data.main;
const { main: weathermood } = data.weather[0];
 const { name } = data;
 const { speed } = data.wind;
    const { country, sunset } = data.sys;


    const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

    } catch (error) {
        console.log(error)
    }

};


useEffect(()=>{
    getWeatherInfo();
}, []);

  return (
    <div>
     <div className='container'>
        <div className='card'  style={{
        backgroundImage: `url(${"https://mobimg.b-cdn.net/v3/fetch/62/624e27fde335d49e2dd3c6b75c6027a3.jpeg"})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
       
      }}>

        <div className='left'>
            <div className='search'>
            <input type="text" placeholer="Search" id="search" 
             className="searchterm" value={serachValue} onChange={(e)=>setsearchValue(e.target.value)}/>
             <button className='searchButton' type="button" onClick={getWeatherInfo}>Search</button>
             </div>
             

             <Weathercard tempInfo={tempInfo}/>
         </div>
        <Detail  tempInfo={tempInfo}/>
         
        </div>
     </div> 
    </div>
  )
}

export default Condition;

