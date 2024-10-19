const homeRoute = require('./homeRoute')
const todoRoute = require('./todoRoute')

function route(app) {
	app.use('/', homeRoute)

	app.use('/todos', todoRoute)

}

module.exports = route; 



