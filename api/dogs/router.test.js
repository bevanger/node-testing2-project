const request = require('supertest');
const server = require('../server');
const db = require('../../data/db.config');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
  })
afterAll(async () => {
    await db.destroy()
})

describe('[POST] /api/dogs', () => {
    test('adds dog to db', async () => {
       await request(server)
            .post('/api/dogs')
            .send({ dog_name: 'randy', dog_age: 7 })
        const dogs = await db('dogs')
        expect(dogs).toHaveLength(7)
    }, 600)
    test('added dog name and dog age to db', async () => {
        const res = await request(server)
            .post('/api/dogs')
            .send({ dog_name: 'boo', dog_age: 10 })
        expect(res.body).toMatchObject({ dog_id: 8, dog_name: 'boo', dog_age: 10 })
    })
})

describe('[DELETE] /api/dogs/:id', () => {
    test('removes dog from the database', async () => {
        const res = await request(server)
            .delete('/api/dogs/1')
        expect(res.body).toEqual({
             "dog_id": 1,
             "dog_name": "fido",
             "dog_age": 3
        })
    })
    test('uable to get dog at deleted id', async () => {
        let dog = await db('dogs').where('dog_id', 1).first()
        expect(dog).toBeTruthy()
        await request(server).delete('/api/dogs/1')
        dog = await db('dogs').where('dog_id', 1).first()
        expect(dog).toBeFalsy()
    })
})