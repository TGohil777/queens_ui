import axios from 'axios';


const authInstance = axios.create({
  timeout: 20000
})

authInstance.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    console.log("Error", JSON.stringify(error.response.data, null, 3));
    return Promise.reject(error.response.data);
  }

  if (error.response.status === 400) {
    console.log("Error", JSON.stringify(error.response.data, null, 3));
    return Promise.reject(error.response.data);
  }
});

export default authInstance;