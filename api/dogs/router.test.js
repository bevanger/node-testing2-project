const request = require('supertest');
const router = require('./dogs-router');
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
    test('responds with the newly created dog', async () => {
        const res = await request(router)
            .post('/api/dogs')
            .send({ dog_name: 'randy', dog_age: 7 })
        expect(res.body).toMatchObject({ dog_id: 7, dog_name: 'randy', dog_age: 7 })
    }, 600)
    test('responds with a 400 status on missing name or age', async () => {
        const res = await request(router)
            .post('./api/dogs')
            .send({ name: 'randy' })
        expect(res.status).toBe(400)
    }, 600)
})

describe('[DELETE] /api/dogs/:id', () => {
    test('responds with the new array of dogs', async () => {
        const res = await request(router)
            .delete('/api/dogs/:id')
            .send({ dog_id: 6 })
        expect(res.body).toHaveLength(5)
    })
    test('responds with status 404 if dog with that id does not exist', async () => {
        const res = await request(router)
            .delete('/api/dogs/:id')
            .send({ dog_id: 8 })
        expect(res.status).toBe(404)
    })
})