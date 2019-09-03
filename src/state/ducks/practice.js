import { registerPractice } from '../../services/onboardpractice'
import {listPractice} from '../../services/listpractice'
import { getpractice , getlocations , getusers  } from '../../services/viewpractice'
import { editOrg} from '../../services/editpractice'
import { catchClause } from '@babel/types';
const ONBOARDING_PRACTICE = 'queens-ui/practice/ONBOARDING_PRACTICE';
const ONBOARDING_FAILURE = 'queens-ui/practice/ONBOARDING_FAILURE';
const ONBOARDING_SUCCESS = 'queens-ui/practice/ONBOARDING_SUCCESS';
const ONBOARDING_RESET = 'queens-ui/practice/ONBOARDING_RESET'
const GET_PRACTICES = 'queens-ui/practice/GET_PRACTICES';
const GET_PRACTICE ='queens-ui/practice/GET_PRACTICE';
const GET_LOCATIONS ='queens-ui/practice/GET_LOCATION';
const GET_USERS ='queens-ui/practice/GET_USER'
// const GET_PRACTICE = 'queens-ui/practice/GET_PRACTICE' ;
// const EDIT_PRACTICE = 'queens-ui/practice/EDIT_PRACTICE';

const initialState = {
    practices:[],
    practice:{},
    locations : [],
    user : [],
    message: '',
    errors:{},
    isRegistered: false,
    loading: false
}
export default function reducer(state={...initialState} , action) {
    switch (action.type){
        case ONBOARDING_PRACTICE: 
        return {
            ...state,
            loading: true
        }
        case ONBOARDING_SUCCESS:{       
            return {
                ...state,
                loading: false,
                isRegistered:true,
                message : action.payload
            }
        }
        case ONBOARDING_FAILURE:
            return {
                ...state ,
               error: action.error.message
            }
        case ONBOARDING_RESET:
            return{
                ...initialState
            }
        case GET_PRACTICES:
            return{
                ...state,
                practices : action.payload,
                loading : true
            }
        case GET_PRACTICE:
            return{
                ...state,
                practice : action.payload,
                loading: true
            }
        case GET_LOCATIONS:
            return{
                ...state,
                locations : action.payload,
                loading: true
            }
        case GET_USERS:
            return{
                ...state,
                user : action.payload,
                loading: true         
            }
        default :
            return state;
    }
}

export async function onboardingPractice (values, dispatch) {
    
    try {
        const response = await registerPractice(values);
        dispatch({type: ONBOARDING_SUCCESS , payload: response.data})    
    } catch (error) {
        dispatch({type: ONBOARDING_FAILURE, error: error});
    }

}

export async function listingPractice(dispatch){
    try {
        const response = await listPractice();
        dispatch({type: GET_PRACTICES , payload: response.data});
    } catch(error){
        console.log(error)
    }
}

export async function viewpractice(id , dispatch){
    try{
        const response = await getpractice(id);
        dispatch({type: GET_PRACTICE ,payload: response.data})
    } catch(error){
        console.log(error)
    }
}

export async function viewlocations(id , dispatch){
    try{
         const response = await getlocations(id);
         console.log('Response location', JSON.stringify(response.data , null ,3))
         dispatch({type: GET_LOCATIONS , payload: response.data})
    } catch(error){
        console.log(error)
    }
}

export async function viewusers(id , dispatch){
    try{
        const response = await getusers(id);
        console.log('Users', JSON.stringify(response.data,null , 3))
        dispatch({type: GET_USERS , payload: response.data})    
    } catch(error){
        console.log(error)
    }
}

export async function editPractice(id , name){
    try{
      const response =  await editOrg(id , name);
    }catch(error){
        console.log(error)
    }
}