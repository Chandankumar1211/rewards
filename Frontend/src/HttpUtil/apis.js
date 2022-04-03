
const env = process.env;
let url = 'http://localhost:5000';

const apis = {
    getUsers: `${url}/getUsers`,
    getUserDetail: `${url}/getUserDetail`
}

export default apis;