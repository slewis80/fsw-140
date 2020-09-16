import React, {useContext, useEffect} from 'react';
import AvengersList from './AvengersList.js'
import {FilterContext} from './FilterProvider.js'

export default function AvengersPage() {

  const { avengers, getAvengers, errMsg } = useContext(FilterContext)


  useEffect(() => {
    getAvengers()
        // eslint-disable-next-line
}, [])

  return (
    <div>
      <h1>Avengers</h1>
      <div>
        <AvengersList avengers={avengers} />
        <p id="errMsg">{errMsg}</p>
      </div>
    </div>
  );
}

