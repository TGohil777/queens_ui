import { useState, useEffect } from 'react';


export const useLocalStorage = () => {
    const [state, setState] = useState({
        token: ''
    });
    
    useEffect(
    () => {
        const token = localStorage.getItem("auth_token");
        setState({
            token: token
        })
    }, [setState])

    return state;
}