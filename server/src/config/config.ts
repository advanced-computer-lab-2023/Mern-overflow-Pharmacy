import dotenv from "dotenv";

dotenv.config();
const MONGO_URL: string = process.env.MONGO_URI!;

const JWT_SECRET:string = process.env.JWT_SECRET!;
const SERVER_PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8001;
const Email:string = process.env.EMAIL!;
const EmailPassword: string = process.env.EMAILPASSWORD!;
const config = {
    mongo: {
        URL: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secret: JWT_SECRET
    },
    mail: {
        email: Email,
        password: EmailPassword
    }
};

export default config;
