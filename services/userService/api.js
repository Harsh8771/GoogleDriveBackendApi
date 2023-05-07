
const messages = require('./protoc/user_pb');

module.exports = class API {
    constructor(client, gRpc) {
        this.client = client;
        this.gRpc = gRpc
    }
    register = (call, callback) => {
        let resp = new messages.UserResponse();
        resp.setId('1');
        resp.setName('2');
        resp.setEmail('3');
        resp.setToken('4');
        callback(null, resp);
    }
}