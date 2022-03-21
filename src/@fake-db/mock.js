import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../services/config';

const mock = new MockAdapter(axiosInstance);

export default mock;