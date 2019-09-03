import {uploadlogo} from '../../services/uploadlogo'

const UPLOAD_LOGO = 'queens-ui/logo/UPLOAD_LOGO';
const UPLOAD_LOGO_FAILURE = 'queens-ui/logo/UPLOAD_LOGO';

const initialState = {
    logoUrl : "",
    error : ""
};

export default function reducer(state={...initialState} , action){
    switch(action.type){
        case UPLOAD_LOGO:{
            console.log('Dispatch',JSON.stringify(action.payload , null , 3))
            return {
               ...state,
               logoUrl : action.payload
            }
        }
        case UPLOAD_LOGO_FAILURE:
            return{
                ...state,
                error : action.payload
            }
        default:
            return state;
    }
}

export async function uploadImage(file , dispatch){
    try{
        const response = await uploadlogo(file);
        dispatch({type: UPLOAD_LOGO , payload: response.data.url})
    } catch(error){
        console.log("Error", error);
        dispatch({type:UPLOAD_LOGO_FAILURE , payload: error})
    }
}
