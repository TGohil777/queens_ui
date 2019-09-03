import authorizedInstance from './authorizedInstance';
const onboardEndPoint = '/api/v1/gateway/onboard-practice';

export function registerPractice(data) {
    console.log('Data in service',JSON.stringify(data , null , 3))
    return authorizedInstance.post(onboardEndPoint, data);
}