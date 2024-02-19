const request = require('supertest');
const app = require('../../app')
const {mongoConnect,mongoDisconnect} = require('../../services/mongo')

describe('Testing the launches API',()=>{

beforeAll(async ()=>{
    await mongoConnect();
})
afterAll(async ()=>{
    await mongoDisconnect();
})

describe('Test GET /launches', ()=>{

    test("It should respond with 200 success",async()=>{
        const response = await request(app)
        .get('/v1/launches')
        .expect(200)
    })
})
describe('Test POST/launch',()=>{
  const completeLaunchData =   {
        mission:"USS Enterprise",
        rocket:"NCC 1701-D",
        target:"Kepler-1652 b",
        launchDate:"January 4,2028"
    }
    const launchDataWithoutDate = {
        mission:"USS Enterprise",
        rocket:"NCC 1701-D",
        target:"Kepler-1652 b",
    };
    const launchDataWithInvalidDate={
        mission:"USS Enterprise",
        rocket:"NCC 1701-D",
        target:"Kepler-62 f",
        launchDate:"Zoot"

    }
    test("It should respond with 201 created",async()=>{
        const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type',/json/)
        .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate)

    expect(response.body).toMatchObject(launchDataWithoutDate)

    })
    test("It should catch missing required property",async()=>{
        const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-type',/json/)
        .expect(400);

    expect(response.body).toEqual({
        error:"Missing required launch property",
    })

    })
    test("It should catch invalid date",async()=>{
        const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-type',/json/)
        .expect(400);

    expect(response.body).toEqual({
        error:"Invalid Launch Date",
    })
        
    })
})

})
