import React from 'react'

export default function Avenger(props){


    return(
        <div className="avengerContainer">
            <a href={props.url} url={props.url}>
                <h2>Name: {props.name}</h2>
                <p>Gender: {props.gender}</p>
                <p>Year: {props.year}</p>
                <p>Appearances: {props.appearances}</p>
                <p>Notes: {props.notes}</p>
            </a>
        </div>
    )
}