import React, {useState} from 'react'
import "./Card.css"
import { Details } from '../Detail/Details';
export function Card({imageURL, type, level, location, published,profile, iconapp}){
    const [clickDetail,setClickDetail] =useState(true);
    const handleClickDetail = () => setClickDetail(!clickDetail);
    return(
            <>
            {clickDetail ? (
                <div className="card-container" onClick={handleClickDetail}>
                    <div className="image-container">
                        <img className="image-lead-bould" src={imageURL}/>
                    </div>
                    <div className="card-content">
                            <p>Lvl: {level}</p>
                            <p>Type: {type}</p>
                            <p>Location: {location}</p>
                            <p>Published: {published}</p>
                            <div className="card-footer-content">
                            <img className ="image-profile" src={profile}/>
                            <img className ="image-logoapp"src={iconapp}/>
                        </div>            
                    </div>
                </div>
            ):(
                <Details/>
            )}
            </>


    )
}