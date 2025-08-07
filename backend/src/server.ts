// environment
import "./bootstrap.js";

// builtin

// external
import fastify, { type FastifyInstance } from "fastify";

// internal


const server: FastifyInstance = fastify();

server.get("/", async (req, res) => {
    return { hello: "World!" };
})

server.get("/ping", async (req, res) => {
    return "pong";
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});



