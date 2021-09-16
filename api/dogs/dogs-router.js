const router = require('express').Router();
const { checkForId, checkRequestBody } = require('./dogs-middleware');
const Dogs = require('./dogs-model');

router.get('/', (req, res, next) => {
    Dogs.getAll()
        .then((dogs) => {
            res.status(200).json(dogs)
        })
        .catch(next)
});

router.get('/:id', checkForId, (req, res, next) => {
    res.status(200).json(req.dog)
});

router.post('/', checkRequestBody, async (req, res, next) => {
    const dog = await Dogs.create(req.body);
    res.status(201).json(dog)
});

router.delete('/:id',checkForId, (req, res, next) => {
    Dogs.remove(req.params.id)
        .then((dogs) => {
            res.status(200).json(dogs)
        })
        .catch(next)
});

module.exports = router;