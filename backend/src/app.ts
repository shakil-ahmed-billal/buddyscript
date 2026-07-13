import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';
import notFound from './app/middleware/notFound.js';
import router from './app/routes/index.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { sanitizeRequest } from './app/middleware/sanitizeRequest.js';
import config from './app/config/index.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth.js";

import path from 'path';

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/app/templates"));

app.use(helmet());

const allowedOrigins = [
  config.client_url as string,
  process.env.PROD_APP_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  })
);

const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 1000 requests per `window`
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	handler: (_req, res) => {
		res.status(429).json({
			success: false,
			message: 'Too many requests from this IP, please try again after 15 minutes',
		});
	},
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20, // Strict limit for auth routes to prevent brute force
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	handler: (_req, res) => {
		res.status(429).json({
			success: false,
			message: 'Too many authentication attempts, please try again after 15 minutes',
		});
	},
});

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeRequest);
app.use(morgan('dev'));

app.all("/api/auth", authLimiter, toNodeHandler(auth));
app.use('/api/v1/auth', authLimiter);
app.use('/api/v1', globalLimiter, router);

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to buddyscript API',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
