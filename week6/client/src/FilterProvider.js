import React, { useState } from 'react'
import axios from 'axios'

export const FilterContext = React.createContext()



export default function FilterProvider(props) {

    const [avengers, setAvengers] = useState([])

    const [errMsg, setErrMsg] = useState("")

    function handleErr(errMsg){
        setErrMsg(errMsg)
    }

    function resetErrMsg(){
        setErrMsg("")
    }


// main loading
    function getAvengers() {
    axios.get("/avengers")
    .then(res => {
        setAvengers(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
}


// filtering
    function filterByGender(gender) {
        axios.get(`/search/gender/${gender}`)
            .then(res => {
                setAvengers(res.data)
                if(res.data.length === 0){
                    setErrMsg(`There are no avengers with a gender of "${gender}"...`)
                }
            })
                
            .catch(err => handleErr(err.response.data.errMsg))
    }

    function filterByYear(year) {
        axios.get(`/search/year/${year}`)
        .then(res => {
            setAvengers(res.data)
            if(res.data.length === 0){
                setErrMsg(`There are no avengers with a starting year of "${year}"...`)
            }
        })
        .catch(err => handleErr(err.response.data.errMsg))
    }

    function filterByAppearances(appearances) {
        axios.get(`/search/appearances/${appearances}`)
        .then(res => {
            setAvengers(res.data)
            if(res.data.length === 0){
                setErrMsg(`There are no avengers with "${appearances}" appearances...`)
            }
        })
        .catch(err => handleErr(err.response.data.errMsg))
    }
    function filterByName(name) {
        axios.get(`/search/name/${name}`)
        .then(res => {
            setAvengers(res.data)
            if(res.data.length === 0){
                setErrMsg(`There are no avengers with a name like "${name}"...`)
            }
        })
        .catch(err => handleErr(err.response.data.errMsg))
    }

// sorting
    function sortByAppearances() {
        axios.get("/sort/appearances")
        .then(res => {
            setAvengers(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    function sortByYear() {
        axios.get("/sort/year")
        .then(res => {
            setAvengers(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    function sortByName() {
        axios.get("/sort/name")
        .then(res => {
            setAvengers(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }




    return(
        <FilterContext.Provider
            value={{
                avengers,
                getAvengers,
                filterByGender,
                filterByName,
                filterByAppearances,
                filterByYear,
                errMsg,
                sortByAppearances,
                sortByYear,
                sortByName,
                resetErrMsg
            }}>
            {props.children}
        </FilterContext.Provider>
    )
}

