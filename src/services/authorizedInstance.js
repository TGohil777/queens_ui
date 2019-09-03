import axios from 'axios';


const authorizedInstance = axios.create({
  timeout:2000,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     //'Content-Type' : 'multipart/form-data',
      'Authorization': localStorage.getItem('auth_token')
  }  
})

authorizedInstance.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    return Promise.reject(error.response.data);
  }

  if (error.response.status === 400) {
    return Promise.reject(error.response.data);
  }
});

export default authorizedInstance;