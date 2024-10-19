const todoData = require('../models/todoModel')

class todoController {

    show(req, res, next) {
        todoData.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    add(req, res, next) {
        todoData.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    update(req, res, next) {
        todoData.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    delete(req, res, next) {
        todoData.findByIdAndDelete(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

}

module.exports = new todoController() 
