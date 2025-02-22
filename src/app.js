import express, { json } from 'express';
import routes from './routes/index.js';
import { PORT } from "./config/appConfig.js";

const app = express();
app.use(json());

// Middlewares for formatting
app.use((req, res, next) => {
    console.log(`Request to URL: ${req.url}`);
    next();
});

app.use("/api", routes);
app.listen(PORT, console.log('Servidor encendido'));

export default app;