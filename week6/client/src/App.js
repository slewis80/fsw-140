import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Avenger from './Avenger.js'

function App() {

  const [avengers, setAvengers] = useState([])

  useEffect(() => {
    axios.get("/avengers")
        .then(res => {
            setAvengers(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
}, [])

  let avengersList = avengers.map(avenger => <Avenger {...avenger} key={avenger._id} />)


  return (
    <div>
      <h1>Avengers</h1>
      <div className="app">
        {avengersList}
      </div>
    </div>
  );
}

export default App;
