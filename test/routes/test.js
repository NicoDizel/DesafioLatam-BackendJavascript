const request = require("supertest");
const app = require("../../src/app.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../src/config/appConfig.js");

// Test denied access when token is not provided
describe("Denegar acceso al no proporcionar token valido", () => {
    test("GET/ should deny access to protected route without token", async () => {

        const { statusCode, body } = await request(app).get("/api/cases");
        expect(statusCode).toBe(401);
        expect(body.message).toBe('Token no proporcionado.');
    });
})

// Test register and login to obtain a valid token
describe("Probar obtención de token al hacer login con un usuario registrado", () => {
    beforeAll(async () => {
        await request(app)
            .post('/api/register')
            .send({ "username": "Test", "password": "Test123" });
    });

    test("POST/ should get a valid access token", async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ "username": "Test", "password": "Test123" });

        expect(response.statusCode).toBe(201);
        const payload = jwt.verify(response.body.token, JWT_SECRET);
        expect(payload).toHaveProperty('username', 'Test');
    });
});

// Test obtain portfolio cases with a valid token
describe("Probar obtener los casos del portafolio al autenticarse", () => {
    let token;

    beforeAll(async () => {
        await request(app)
            .post('/api/register')
            .send({ "username": "Test", "password": "Test123" });
        
        const { body } = await request(app)
            .post('/api/login')
            .send({ "username": "Test", "password": "Test123" });
        
        token = body.token; 
        
    });

    test("GET/ should get all portfolio cases", async () => {

        const response = await request(app)
            .get('/api/cases')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test("GET/ should get a specific case", async () => {

        const response = await request(app)
            .get('/api/cases/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});