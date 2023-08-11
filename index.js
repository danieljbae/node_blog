// Imports
const express = require('express')
const path = require('path')

// Init App server
const app = express()

// Register folder for static assets
app.use(express.static('public'))

// Create route handlers
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/about.html"))
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/contact.html"))
})

app.get("/post", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/post.html"))
})

//  Start App Server
app.listen(port = 4000, () => {
    console.log('App listening on Port 4000')
})