import React from 'react'

export default function Avenger(props){

    return(
        <div className="avengerContainer">
            <h2>Name: {props.name}</h2>
            <p>Gender: {props.gender}</p>
            <p>Year: {props.year}</p>
            <p>Appearances: {props.appearances}</p>
            <p>Notes: {props.notes}</p>
        </div>
    )
}