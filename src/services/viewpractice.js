import authorizedInstance from './authorizedInstance';

export function getpractice(id) {
    const practice = `/api/v1/gateway/single-organization/${id}`;
    return authorizedInstance.get(practice);
}

export function getlocations(id){
    const locations = `/api/v1/gateway/associated-locations/${id}`
    return authorizedInstance.get(locations);
}

export function getusers(id){
    const user = `/api/v1/gateway/associated-users/${id}`
    return authorizedInstance.get(user);
}
