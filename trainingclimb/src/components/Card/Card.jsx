import React from 'react'
import "./Card.css"
export function Card({id,imageURL, dateadd, type, level, location, published,profile, iconapp}){
    return(
            <div key={id} className="card-container">
                <img className="image-lead-bould" src={imageURL}/>  
                <div className="content">
                    <p className="dateadd">{dateadd}</p>
                    <p className="item-card-content">Lvl: {level}</p>
                    <p className="item-card-content">Type: {type}</p>
                    <p className="item-card-content">Location: {location}</p>
                    <p className="item-card-content">Published: {published}</p>
                    <img className ="image-profile" src={profile}/>
                    <img className ="image-logoapp"src={iconapp}/> 
                </div> 
            </div>
    )
}