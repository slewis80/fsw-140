const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myPassword123!',
    database: 'avengers'
})

db.connect((err) => {
    if(err){
        throw err
    }
    console.log("Connected to the database")
})

// middleware
app.use(express.json())
app.use(morgan('dev'))


// routing

// CRUD
    // get all
    app.get("/avengers", (req, res, next) => {
        let sql = `SELECT * FROM modifiedavengers`
        db.query(sql, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(avengers)
        })
    })

    // post new
    app.get("/addNewAvenger", (req, res, next) => {
        let post = req.body
        let sql = `INSERT INTO modifiedavengers SET ?`
        let query = db.query(sql, post, (err, result) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(`Successfully added avenger...`)
        })
    })

    // update one
    app.get("/updateAvenger/:id", (req, res, next) => {
        let updates = req.body
        let sql = `UPDATE modifiedavengers SET ? WHERE _id = ${req.params.id}`
        let query = db.query(sql, updates, (err, result) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully updated avenger...`)
        })
    })

    // delete one
    app.get("/deleteAvenger/:id", (req, res, next) => {
        let sql = `DELETE FROM modifiedavengers WHERE _id = ${req.params.id}`
        db.query(sql, (err, result) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted avenger...`)
        })
    })
    
// searching
    // search by gender
    app.get("/search/gender/:gender", (req, res, next) => {
        let gender = req.params.gender
        console.log(gender)
        let sql = `SELECT * FROM modifiedavengers WHERE gender = ?`
        let query = db.query(sql, gender, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!avengers){
                res.status(204)
                return next(new Error(`No avengers with a gender of ${gender}...`))
            }
            return res.status(200).send(avengers)
        })
    })

    // search by year
    app.get("/search/year/:year", (req, res, next) => {
        let sql = `SELECT * FROM modifiedavengers WHERE year = ${req.params.year}`
        db.query(sql, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!avengers){
                res.status(204)
                return next(new Error(`No avengers starting in the year ${req.params.year}...`))
            }
            return res.status(200).send(avengers)
        })
    })

    // search by appearances
    app.get("/search/appearances/:appearances", (req, res, next) => {
        let appearances = req.params.appearances
        let sql = `SELECT * FROM modifiedavengers WHERE appearances = ?`
        let query = db.query(sql, appearances, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!avengers){
                res.status(204)
                return next(new Error(`No avengers with ${appearances} appearances...`))
            }
            return res.status(200).send(avengers)
        })
    })

    // search by name
    app.get("/search/name/:name", (req, res, next) => {
        let name = `%${req.params.name}%`
        let sql = `SELECT * FROM modifiedavengers WHERE name LIKE ?`
        let query = db.query(sql, name, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            if(!avengers){
                res.status(204)
                return next(new Error(`No avengers with a name including ${req.params.name}...`))
            }
            return res.status(200).send(avengers)
        })
    })

// sorting
    // sort by appearances
    app.get("/sort/appearances", (req, res, next) => {
        let sql = `SELECT * FROM modifiedavengers ORDER BY appearances + 0 DESC`
        db.query(sql, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(avengers)
        })
    })

    // sort by year
    app.get("/sort/year", (req, res, next) => {
        let sql = `SELECT * FROM modifiedavengers ORDER BY year DESC`
        db.query(sql, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(avengers)
        })
    })

    // sort by name
    app.get("/sort/name", (req, res, next) => {
        let sql = `SELECT * FROM modifiedavengers ORDER BY name`
        db.query(sql, (err, avengers) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(avengers)
        })
    })






// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// listen
app.listen(9000, () => console.log("Server is running on 9000"))
