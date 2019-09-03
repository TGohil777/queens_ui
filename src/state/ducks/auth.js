import { userLogin } from '../../services/auth';

const LOGOUT_USER = 'queens-ui/auth/LOGOUT_USER';
const LOGIN_USER_SUCCESS = 'queens-ui/auth/LOGIN_USER_SUCCESS'
const LOGIN_USER_FAILURE = 'queens-ui/auth/LOGIN_USER_FAILURE' 

const initialState = {
    login:{
        isLoggedIn: false,
        error: null
    }
}

export default function reducer(state={...initialState}, action) {
    switch (action.type) {
        case LOGOUT_USER: 
            return{
                ...state,
                login :{
                    isLoggedIn: false,
                    error: null
                }
            }
        case LOGIN_USER_SUCCESS: 
            return {
                ...state,
                login:{
                    isLoggedIn: true,
                    error: null
                }
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                login:{
                    isLoggedIn: false,
                    error: action.error
                }
            }
        default:
         return state;
    }
}


export async function loginUser (data, dispatch) {
    try {
        const response = await userLogin(data);
        console.log("Response", JSON.stringify(response, null, 3));
        localStorage.setItem('auth_token', response.data.token);
        dispatch({type: LOGIN_USER_SUCCESS, isLoggedIn: true})
        window.location.reload();
    } catch (error) {
        dispatch({type: LOGIN_USER_FAILURE, error: error});
    }

}

export async function logoutUser (history , dispatch) {
    try{
        localStorage.removeItem('auth_token')
      dispatch({type: LOGOUT_USER})
    }catch(error){
        console.log(error)
    }
}