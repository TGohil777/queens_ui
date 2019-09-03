import React,{ useEffect} from 'react'
import useStore from '../../../state/useStore';
import { viewpractice} from '../../../state/ducks/practice'
import Avatar from '@material-ui/core/Avatar';
import {withRouter} from 'react-router-dom'
function HeaderPractice({value}) {
    const [ {practice} , dispatch] = useStore();

    useEffect(() => {
        viewpractice(value , dispatch);
    },[]);

    return (
        <React.Fragment>
             <Avatar alt="Remy Sharp" style={{
                    height: '80px',
                    width: '80px',
                }} /><t />
                <label style={{ paddingLeft: '20px' }}><b>{practice.practice.name}</b></label>
                </React.Fragment>
    )
}

export default withRouter(HeaderPractice);