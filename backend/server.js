const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 8000

// Middleware
app.use(express.json())
app.use(cors())

// Routes
const route = require('./routes/')
route(app)

// Connect to db 
mongoose.connect("")
	.then(() => console.log("Connected"))
	.catch(err => console.log(err))

mongoose.connection.on("error", err => {
	console.error("MongoDB connection error:", err);
});

// Listening 
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
