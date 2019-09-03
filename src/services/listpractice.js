import authorizedInstance from './authorizedInstance';
const listpractice = '/api/v1/gateway/list-organization';

export function listPractice() {
    return authorizedInstance.get(listpractice);
}

