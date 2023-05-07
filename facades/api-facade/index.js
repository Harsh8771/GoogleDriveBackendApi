const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const USER_PROTO_PATH = __dirname + '../../../services/userService/proto/user.proto';

const packageDefinition = protoLoader.loadSync(
    USER_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });


const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const client = new protoDescriptor.user.UserSvc(
    'localhost:50051',
    grpc.credentials.createInsecure()
);


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', async (req, res) => {
    await client.register({
        name: 'abc',
        email: 'abc@gmail.com',
        password: '1234'
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data)
    });

});


function main() {
    app.listen(8000, () => {
        console.log('REST SERVER is running on 8000');
    });
}

main();