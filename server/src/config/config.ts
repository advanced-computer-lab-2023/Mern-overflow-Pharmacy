import dotenv from "dotenv";

dotenv.config();
const MONGO_URL:string = process.env.MONGO_URI!;

const JWT_SECRET:string = process.env.JWT_SECRET!;
const SERVER_PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

const config = {
    mongo: {
        URL: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secret: JWT_SECRET
    }
};

export default config;