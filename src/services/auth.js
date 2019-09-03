import authInstance from './authInstance';
const loginEndPoint = '/api/v1/gateway/login-user';

export function userLogin(data) {
    return authInstance.post(loginEndPoint, data);
}