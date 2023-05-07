require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { Client } = require("pg");
const services = require('./protoc/user_grpc_pb');
const API = require('./api');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

let api = null;

async function connectToPostgres() {
    try {
        client.connect();
        api = new API(client, grpc);
    } catch (e) {
        console.log(e)
    }
}


async function main() {
    await connectToPostgres().catch(console.dir);
    const server = new grpc.Server();
    server.addService(services.UserSvcService, {
        register: api.register,
        // login: api.login,
        // verify: api.verify,
        // getUser: api.getUser,
    })

    let address = process.env.HOST + ":" + process.env.PORT;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });

}

main();


