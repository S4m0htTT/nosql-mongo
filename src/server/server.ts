import express, {Express} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import setRoutes from "./routes.js";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";

const server: Express = express();
server.use(helmet());
server.use(cookieParser());
server.use(express.json({ limit: '100mb'}));
server.use(express.urlencoded({ limit: '100mb', extended: true }));
server.use(cors());
server.use(morgan('dev'));
server.use("/v1/api", setRoutes);
export default server;
