import { AuthApi } from "../constants/apiEndPoints";
import mock from './mock';

const data = [
    { name: 'admin', role: 'admin' },
    { name: 'Manager', role: 'manager' },
    { name: 'User', role: 'user' },
]

mock.onPost(AuthApi.login).reply((config) => {
    const { username
    } = JSON.parse(config.data)


    const foundUser = data.find(user => user.name === username);
    return [
        200,
        { succeeded: true, data: foundUser, },
    ]
})