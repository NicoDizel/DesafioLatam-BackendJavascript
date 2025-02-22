import request from "supertest";
import app from "../../src/app.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/config/appConfig.js";
import User from "../../src/models/user.model.js";

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
            .send({
                "name": "Test",
                "email": "test@email.com",
                "phone": "12345678",
                "password": "Test123",
                "role_id": "1"
              });
    });

    test("POST/ should get a valid access token", async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ "email": "test@email.com", "password": "Test123" });

        expect(response.statusCode).toBe(201);
        const payload = jwt.verify(response.body.token, JWT_SECRET);
        expect(payload).toHaveProperty('email', 'test@email.com');
    });

    afterAll(async () => {
        await User.destroy({
            where: {
              email: 'test@email.com',
            },
          });
    });
});

// Test obtain portfolio cases with a valid token
describe("Probar obtener los casos del portafolio al autenticarse", () => {
    let token;

    beforeAll(async () => {
        await request(app)
            .post('/api/register')
            .send({
                "name": "Test",
                "email": "test@email.com",
                "phone": "12345678",
                "password": "Test123",
                "role_id": "1"
              });
        
        const { body } = await request(app)
            .post('/api/login')
            .send({ "email": "test@email.com", "password": "Test123" });
        
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

    afterAll(async () => {
        await User.destroy({
            where: {
              email: 'test@email.com',
            },
          });
    });
});