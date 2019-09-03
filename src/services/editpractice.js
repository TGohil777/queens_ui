import authorizedInstance from './authorizedInstance';

export function editOrg(id , name){
    const practice = `/api/v1/gateway/edit-organization/${id}`
    return authorizedInstance.get(practice , name);
}
