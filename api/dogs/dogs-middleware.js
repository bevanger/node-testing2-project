const Dogs = require('./dogs-model');

const checkRequestBody = (req, res, next) => {
    if(!req.body.name || !req.body.age) {
        next({ status: 400, message: 'Be sure to have a dog name and age'});
    } else {
        next()
    }
}

const checkForId = (req, res, next) => {
    Dogs.getById(req.params.id)
        .then((dog) => {
            if(dog) {
                req.dog = dog;
                next()
            } else {
                next({ status: 404, message: 'no dog found at that id'});
            }
        })
        .catch(next)
}

module.exports = {
    checkRequestBody,
    checkForId,
}