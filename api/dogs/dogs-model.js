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

async function remove(id){
    const dog = await getById(id)
    await db('dogs').where('dog_id', id).del()
    return dog
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
}