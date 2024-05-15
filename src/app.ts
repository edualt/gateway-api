import express, {Application, Request, Response} from "express";
import morgan from "morgan";

import dotenv from "dotenv";
import {Signale} from "signale";
import proxy from "express-http-proxy";

const app:Application = express();
const signale = new Signale();

dotenv.config();

app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;
const GATEWAY = process.env.SERVICE_NAME;

app.use('/api/orders',proxy('http://localhost:3001'));
app.use('/api/products',proxy('http://localhost:5000'));

// health check
app.get('/health', (req: Request, res: Response) => {
    res.json({status: 'UP'});
});

// rutas de auth

app.listen(PORT, () => {
    signale.success(`Servicio ${GATEWAY} corriendo en http://localhost:${PORT}`);
});