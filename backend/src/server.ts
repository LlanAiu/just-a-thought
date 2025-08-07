// environment
import "./bootstrap.js";

// builtin

// external
import fastify, { type FastifyInstance } from "fastify";
import { setupRoutes } from "./routes.js";

// internal


const server: FastifyInstance = fastify();

server.get("/", async (req, res) => {
    return { hello: "World!" };
})

setupRoutes(server);



server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});



