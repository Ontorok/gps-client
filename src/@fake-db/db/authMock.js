import Mock from '@fake-db/mock';
import jwt from 'jsonwebtoken';
import { AUTH_API } from 'services/apiEndPoints';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

const userList = [
  {
    id: 1,
    role: 'Admin',
    name: 'Jason Alexander',
    username: 'admin',
    email: 'admin@mail.com',
    address: '554 Barlow Drive, Alamo, Michigan, 3686',
    phone: '+1 (848) 410-2368'
  },
  {
    id: 2,
    role: 'Manager',
    name: 'Gallagher Shaw',
    username: 'manager',
    email: 'manager@mail.com',
    address: '111 Argyle Road, Graball, Idaho, 7272',
    phone: '+1 (896) 422-3786'
  },
  {
    id: 3,
    role: 'User',
    name: 'Blanchard Knapp',
    username: 'user',
    email: 'user@mail.com',
    address: '111 Argyle Road, Graball, Idaho, 7272',
    phone: '+1 (867) 542-2772'
  }
];

Mock.onPost(AUTH_API.login).reply(async config => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email } = JSON.parse(config.data);
    const user = userList.find(u => u.email === email);

    if (!user) {
      return [400, { message: 'Invalid email or password' }];
    }
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY
    });

    return [
      200,
      {
        succeed: true,
        accessToken
      }
    ];
  } catch (err) {
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onPost(AUTH_API.logout).reply(async config => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      200,
      {
        succeed: true
      }
    ];
  } catch (err) {
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onGet(AUTH_API.get_me).reply(config => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { username } = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find(u => u.username === username);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        succeed: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role,
          address: user.address,
          phone: user.phone
        }
      }
    ];
  } catch (err) {
    return [500, { message: 'Internal server errorsss' }];
  }
});
