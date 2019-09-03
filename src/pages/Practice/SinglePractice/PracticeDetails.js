import React, { useState ,useEffect } from 'react'
import useStore from '../../../state/useStore';
import { Avatar, Input, Typography , Button } from 'antd'
// import Logo from './logo.png'
import { SwatchesPicker } from 'react-color'
import reactCSS from 'reactcss'
import { flexbox } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import { viewpractice} from '../../../state/ducks/practice'
import { withRouter} from 'react-router-dom'
const { Text, Paragraph } = Typography;

const initialState = {
    displayColorPicker: false,
    hex: '',
    inEditMode : false,
    orgName : ''
};
function PracticeDetails(props) {
    const [state, setState] = useState({ ...initialState });
    const [ {practice} , dispatch] = useStore();
    const {value} = props
    const handleClick = () => {
        setState({ displayColorPicker: !state.displayColorPicker })
    };
    const setpractice =(e) => {
        setState({orgName : e.target.value}) 

      //  console.log('OrgName', JSON.stringify(practice.practice.name , null , 3));  
    }

    const handleClose = () => {
        setState({ displayColorPicker: false })
    };

  
    useEffect(() => {
        viewpractice(value , dispatch);
      // const fetchpost =  () => {
          //  setState({orgName : practice.practice.name})
         // setLoading(true);
        //    viewpractice(value , dispatch);
        //    //console.log('Practices', JSON.stringify(practice.practices , null ,3))
        //  //  console.log('List' , JSON.stringify(res.data,null,3))
        //     // setPost(pracitce.practices);
        //     // setLoading(false)
      //  }
    //  fetchpost();
    },[]);

    const handleChanging = (color) => {
        setState({ hex: color.hex });
     };

   const changeEditMode = () => {
       setState({ inEditMode : !state.inEditMode})
   }

   const updateValue = (e) => {
       setState({inEditMode : false});
      // setState({ orgName : this.refs.newValue.value})
      setState({[e.target.name] : e.target.value});
   }

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${state.hex}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });
    return (
       
        <div className='PracticeDetails' >
            {/* <Grid container spacing={3}> */}
            <div className='row'>
            <div className='col-sm-5'>
                <Grid item xs={4} style={{
                    fontSize: '35px',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    //justifyContent: 'space-between',
                    alignItems: 'center',
                }}><Avatar size={64} 
                src={`${practice.practice.logourl}`} 
                style={{
                    height: '200px',
                    width: '200px',
                }} />
                </Grid>
            </div>
            <div className='col-sm-5 col-sm-push-1'>
                <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', content: 'center' }}>
                     <Text type='code' style={{ fontSize: 'large', paddingBottom: '20px' }}><b>{practice.practice.subdomain}</b></Text>
                 </Grid>
                 <Grid>
                   { state.inEditMode ?  
                   <div>
                    <input type='text'
                    name='orgName'
                     style={{ fontSize: 'large', paddingBottom: '20px' }} 
                     defaultValue={state.orgName}
                    setfieldsvalue={state.orgName}
                     //onChange={setpractice}
                     //ref="newValue"
                     />
                     <Button onClick={updateValue}>OK</Button>
                     <Button onClick={changeEditMode}>X</Button>
                     </div>
                   : <Paragraph  style={{ fontSize: 'large', paddingLeft: '20px' }} onDoubleClick={changeEditMode}>{state.orgName ?<b>{state.orgName}</b> :<b>{practice.practice.name}Hii</b> }</Paragraph> }
                   </Grid>
                   <div>
                    <div style={{ flexDirection: 'row' }}>
                        <Input type='text' name='themecolor' placeholder={practice.practice.themecolor} value={state.hex} />
                        <div style={styles.swatch} onClick={handleClick}>
                            <div style={styles.color} />
                        </div>
                    </div>
                {/* </Grid> */}
            
                {state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <SwatchesPicker color={practice.practice.themecolor} onChange={handleChanging} />
                </div> : null}
            </div>
            {/* </Grid> */}
            </div>
            </div>
        </div>
    )
}

export default withRouter(PracticeDetails);