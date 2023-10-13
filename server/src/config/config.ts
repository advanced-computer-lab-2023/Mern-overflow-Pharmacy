import dotenv from "dotenv";

dotenv.config();

const MONGO_URL:string = process.env.MONGO_URI!;

const SERVER_PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const config = {
    mongo: {
        URL: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
};

export default config;