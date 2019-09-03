import authorizedInstance from './authorizedInstance';
const users = '/api/v1/gateway/upload'

export function uploadlogo(file){
    return authorizedInstance.post(users,file);
}
