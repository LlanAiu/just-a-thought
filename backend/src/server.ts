// environment
import "./bootstrap.js";

// builtin

// external
import fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";

// internal
import { setupRoutes } from "./routes.js";

const ALLOWED_ORIGINS = process.env.FRONTEND_URL;
if (!ALLOWED_ORIGINS) throw new Error("ALLOWED_ORIGINS environment variable not set!");


const server: FastifyInstance = fastify();

await server.register(cors, {
    origin: [ALLOWED_ORIGINS],
    credentials: true
});

server.get("/", async (_req, _res) => {
    return { hello: "World!" };
});

setupRoutes(server);


server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});



