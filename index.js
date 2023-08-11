// Imports
const path = require('path')
const express = require('express')
const expressEdge = require('express-edge')

// Init App server
const app = express()


// Add Functionality to app
app.use(express.static('public')) // Register static assets
app.use(expressEdge) // Templating engine functionality
app.set('views', `${__dirname}/views`) // Set location of views

// Create route handlers with express-edge
app.get("/", (req, res) => {
    res.render('index')
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