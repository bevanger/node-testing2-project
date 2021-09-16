const db = require('../../data/db.config');

function getAll() {
    return db('dogs')
}

function getById(id) {
    return db('dogs').where('dog_id', id).first()
}

async function create(dog) {
    const [id] = await db('dogs').insert(dog)
    return getById(id)
}

function remove(id){
    db('dogs').where('dog_id', id).del()
    return getAll()
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
}