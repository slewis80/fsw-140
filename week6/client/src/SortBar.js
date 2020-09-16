import React, { useContext, useState } from 'react'
import { FilterContext } from './FilterProvider.js'

export default function Sortbar() {
    const {
        getAvengers,
        filterByGender, 
        filterByYear, 
        filterByAppearances, 
        filterByName,
        sortByAppearances,
        sortByYear,
        sortByName,
        errMsg
    } = useContext(FilterContext)

    const startingInput = {
        gender: "",
        filter: "",
        input: ""
    }
    const [inputs, setInputs] = useState(startingInput)


    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))  
    }


    function handleFilter(e) {
        e.preventDefault()
        console.log(inputs)

        // let filter = e.target.value
        // console.log(filter)
        if(inputs.gender !== ""){
            return filterByGender(inputs.gender)
        } else if(inputs.filter === "year"){
            return filterByYear(inputs.input)
        } else if(inputs.filter === "appearances"){
            return filterByAppearances(inputs.input)
        } else if(inputs.filter === "name"){
            return filterByName(inputs.input)
        }
        setInputs(startingInput)
        console.log(errMsg)
    }

    function resetPage() {
        setInputs(startingInput)
        getAvengers()
    }
       


    return (
        <div className="sortbar">
           <form name="searchForm" id="searchForm" onSubmit={handleFilter}>
                <select name="gender" onChange={handleInputChange}>
                    <option name="" value="">filter By Gender</option>
                    <option name="gender" value="MALE">Male</option>
                    <option name="gender" value="FEMALE">Female</option>
                </select>
                <input name="input" value={inputs.input} onChange={handleInputChange} placeholder="search terms..."></input>
                <select name="filter" onChange={handleInputChange}>
                    <option name="" value="">filter by...</option>
                    <option name="filter" value="name">Name</option>
                    <option name="filter" value="year">Starting Year</option>
                    <option name="filter" value="appearances">Appearances</option>
                </select>
                <button onClick={handleFilter}>Filter</button>
                <button onClick={resetPage}>Reset Results</button>
            </form>
            <div id="sortingButtonsContainer">
                <span>Sort By:</span>
                <span className="sortingButtons" onClick={sortByAppearances} >Appearances</span>
                <span className="sortingButtons" onClick={sortByYear} >Starting Year</span>
                <span className="sortingButtons" onClick={sortByName} >Name</span>
            </div>
        </div>
    )
}