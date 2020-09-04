const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const table = "modifiedavengers"

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
    // get all
    app.get("/avengers", (req, res, next) => {
        let sql = `SELECT * FROM ${table}`
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
        let sql = `INSERT INTO ${table} SET ?`
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
        let sql = `UPDATE ${table} SET ? WHERE _id = ${req.params.id}`
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
        let sql = `DELETE FROM ${table} WHERE _id = ${req.params.id}`
        db.query(sql, (err, result) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted avenger...`)
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
