import React from 'react'
import "./Card.css"
export function Card({imageURL, type, level, location, published,profile, iconapp}){
    return(
        <div className="card-container">
            <div className="image-container">
                <img className="image-lead-bould" src={imageURL}/>
            </div>
            <div className="card-content">
                <p>Lvl: {level}</p>
                <p>Type: {type}</p>
                <p>Location: {location}</p>
                <p>Published: {published}</p>
                <img src={profile}/>
                <img src={iconapp}/>
            </div>
        </div>
    )
}