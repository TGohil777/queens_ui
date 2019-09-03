// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const useAxiosGet = url => {
//     const [state, setState] = useState({data: null, loading: true, error: null});

//     useEffect(() => {
//         axios.get(url).then(response => setState({
//             data: response.data,
//             loading: false
//         })).catch(err => {
//             setState({
//                 loading: false,
//                 error: err
//             });
//         })
//     }, [url, setState])

//     return state
// }

// const useAxiosWithData = (url, data) => {

// }