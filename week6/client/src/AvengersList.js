import React from 'react'
import Avenger from './Avenger.js'

export default function AvengersList(props) {
    const { avengers } = props

    let avengersList = avengers.map(avenger => <Avenger {...avenger} key={avenger._id} />)

    return (
        <div className="avengersListContainer">
            {avengersList}
        </div>
    )

}

