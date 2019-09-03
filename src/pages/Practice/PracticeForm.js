import React,{useState} from 'react'
import { SwatchesPicker } from 'react-color'
import reactCSS from 'reactcss'
import {withRouter} from 'react-router-dom'
import {
    Form,
    Input,
    Select,
    Button,
    AutoComplete,
    Divider,
    Alert,
    Tooltip,
    Icon,
    Modal
  } from 'antd';
import { onboardingPractice } from '../../state/ducks/practice';
import {uploadImage} from '../../state/ducks/logo'
import useStore from '../../state/useStore';
import validators from 'validator';


  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;

  const initialState = {
     displayColorPicker: false,
     hex: '#fff'
  };

  const initialValue = {
          orgname:'',
          webaddress:'',
          subdomain:'',
          themecolor:'',
          logourl:'',
          orglocation:'',
          address1:'',
          address2:'',
          city:'', 
          state:'',
          zipcode:'',
          lat:'569797',
          lng:'6969797',
          firstname:'', 
          lastname:'',
          email:'',
          password:'',
          confirmpassword:'',
          imagePreview : ''
  }

  

function PracticeForm({form, history}) {
    const { getFieldDecorator ,validateFieldsAndScroll,validateFields ,autoCompleteResult,getFieldValue } = form
    const [values, setValues] = useState({...initialValue});
    const [filename, setFilename] = useState('Choose File');

    const [forms,setForm] = useState({
        confirmDirty: false,
        autoCompleteResult: [],
    });

    const [state, setState] = useState({...initialState});

    const onFocus = event => {

      if(event.target.autocomplete)
      {
        event.target.autocomplete = "whatever";
      }
   
   };

      const handleClick = () => {
         setState({ displayColorPicker: !state.displayColorPicker })
       };
    
       const handleClose = () => {
         setState({ displayColorPicker: false })
       };
      
        const handleChanging = (color) => {
         setState({ hex: color.hex });
         setValues({...values , themecolor: color.hex})
        };

    const [{ practice , logo } , dispatch ] = useStore();
    
   const imageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    setFilename(e.target.files[0].name);
    const data = new FormData();
    data.append('logourl', file);
    uploadImage(data , dispatch);
    reader.onloadend = () => {
       
          setValues({...values ,
           imagePreview : reader.result
             })
         }
        reader.readAsDataURL(file)
   }

    const handleChange = (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }

    const handleSubDomain = (e) => {
      setValues({...values,subdomain : e.target.value + ".bvitals.com"})
    }

    const setImage = (e) => {
      if(logo.logoUrl){
        setValues({...values ,
          logourl : logo.logoUrl
         })}
    }
    
    // const signUpUser = (values, dispatch) => {
    //   console.log("Inside signUpUser", JSON.stringify(values, null ,3))
    //   onboardingPractice(values, dispatch)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(resolve, 1000);
    //   })
      
    // }

  const  handleSubmit = e => {
      e.preventDefault();
        validateFieldsAndScroll((err, val) => {
        if (!err) {
            console.log("No errors", JSON.stringify(values, null ,3))
           // signUpUser(values, dispatch)
           onboardingPractice(values, dispatch)
           // .then(clearForm)
          } else {
         console.log(err)
          }
         });
  };

  const clearForm = () => {
    // setValues({
    //   ...initialValue
    // })
  }

  const  handleConfirmBlur = e => {
        const { value } = e.target;
        setForm({ confirmDirty: forms.confirmDirty || !!value });
      };

  const  compareToFirstPassword = (rule, value, callback) => {
         
        if (value && value !== getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };

   const  validateToNextPassword = (rule, value, callback) => {
        
        if (value && forms.confirmDirty) {
          validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
//   const  handleWebsiteChange = value => {
//         let autoCompleteResult;
//         if (!value) {
//           autoCompleteResult = [];
//         } else {
//           autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
//         }
//         setForm({ autoCompleteResult });
//       };
    // const handleWebsiteChange = value => {

    // }
   
   
    const formItemLayout = {
        // labelCol: {
        //   xs: { span: 24 },
        //   sm: { span: 8 },
        // },
        // wrapperCol: {
        //   xs: { span: 24 },
        //   sm: { span: 16 },
        // },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

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

        //  const validateEqual = (rule, value, callback) => {
        //   if (validators.contains(value, '.')) {
        //     callback("Sub Doiman is Invalid")
      
        //   } if (validators.contains(value, ' ')) {
        //     callback("Sub Doiman cannot have Space")
        //   } else {
        //     callback();
        //   }
      
        // }

        const validateWebaddress = (rule, value, callback) => {
          if (validators.isFQDN(value)) {
            callback();
          } else {
            callback("web address is invalid")
          }
        }

        const gotoDahboard = () =>{
          history.push('/dashboard')
       // window.location.reload();
        }

        const success = (value) => {
          
        if( value) 
        {            // <Alert message='Successfully registered !!!' type='info' /> 
    
            Modal.success({
              title:'You are onboarded successfully',
             // afterClose : gotoDahboard
               onOk(){
               history.push('/dashboard');
            //  gotoDahboard()
               }
            })
        }
        else {
        return  null;
        }
      
        }
    // //   const websiteOptions = autoCompleteResult.map(website => (
    // //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // //   ));
    // const websiteOptions = () => {

    // }
  // const  normFile = e => {
  //     console.log('Upload event:', e);
  //     if (Array.isArray(e)) {
  //       return e;
  //     }
  //     return e && e.fileList;
  //   };
  let $imagePreview = null;
  
    return (
        <div>
         <Divider>Practice Details</Divider>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-sm-5'>
        <Form.Item label="Practice Name">
        {getFieldDecorator('orgname', {
            rules: [
              {
                required: true,
                message: 'Please input your Practice name'
              },
            ],
          })(
          <Input type ='text' name='orgname' autocomplete="new-password" autofill="off" setfieldsvalue={values.orgname} onChange={handleChange} onFocus={onFocus}/>)}
        </Form.Item>
        <Form.Item label="Website">
        {getFieldDecorator('webaddress', {
            rules: [
              {
                required: true,
                message: 'Please input your webaddress',
              },{
                validator: validateWebaddress,
              }
            ],
          })(
         <Input type='text' name='webaddress' autocomplete="new-password" autofill="off" setfieldsvalue={values.webaddress} onChange={handleChange} onFocus={onFocus} />)}
        </Form.Item>
        <Form.Item label="Subdomain">
        {getFieldDecorator('subdomain', {
            rules: [
              {
                required: true,
                message: 'Please input your subdomain',
              },{
               // validator: validateEqual,
              }
            ],
          })(
          <Input type='text' name='subdomain' autocomplete="new-password" autofill="off" setfieldsvalue={values.subdomain} onChange={handleSubDomain}
        addonAfter= '.bvitals.com' onFocus={onFocus} /> )}
           </Form.Item>
        <Form.Item label="Upload Logo"> 
           <label className='custom-file-label' htmlFor='customFile' style={{display:'block'}}>
            {filename}
          </label>  
            <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={imageChange}
            onBlur={setImage}
            label = {filename}
            accept = 'image/jpeg,image/png,image/tiff'
          />
          {!$imagePreview && <img src={values.imagePreview} style={{maxWidth:'100%',height:'auto'}}/>} 
          
        </Form.Item>
        <Form.Item label="Color Theme">
         {/* <Input type='text' name='themecolor' value={values.themecolor} onChange={handleChange}/> */}
         <div>
         <Input type='text' autocomplete="new-password" autofill="off" name='themecolor' value={state.hex} onFocus={onFocus}/> 
          <div style={ styles.swatch } onClick={ handleClick }>
            <div style={ styles.color } />
          </div>
         { state.displayColorPicker ? <div style={ styles.popover }>
         <div style={ styles.cover } onClick={ handleClose }/>
           <SwatchesPicker color={ state.color } onChange={ handleChanging } />
         </div> : null } 
          </div>
       </Form.Item>
        </div>
        {/* <Divider>Location Details</Divider> */}
        <div  className='col'></div>
        <div className='col-sm-5 col-sm-push-1'>
        <Form.Item label="Location Name">
        {getFieldDecorator('orglocation', {
            rules: [
              {
                required: true,
                message: 'Please give name to your Location',
              },
            ],
          })(
         <Input type ='text' name='orglocation' autocomplete="new-password" autofill="off" placeholder='Example: MV01' setfieldsvalue={values.orglocation} onChange={handleChange} onFocus={onFocus}/>)}
        </Form.Item>
        <Form.Item label="Address Line 1">
        {getFieldDecorator('address1', {
            rules: [
              {
                required: true,
                message: 'Please give your house/flat details',
              },
            ],
          })(
        <Input type ='text' name='address1' autocomplete="new-password" autofill="off" setfieldsvalue={values.address1} onChange={handleChange} onFocus={onFocus}/>)}
        </Form.Item>
        <Form.Item label="Address Line 2">
         <Input type ='text' name='address2' autocomplete="new-password" autofill="off" setfieldsvalue={values.address2} onChange={handleChange} onFocus={onFocus}/>
        </Form.Item>
        <Form.Item label="City">
        {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Please input your city',
              },
            ],
          })(
         <Input type ='text' name='city' autocomplete="new-password" autofill="off" setfieldsvalue={values.city} onChange={handleChange} onFocus={onFocus} />)}
          </Form.Item>
          <Form.Item label="State">
          {getFieldDecorator('state', {
            rules: [
              {
                required: true,
                message: 'Please input your state',
              },
            ],
          })(
         <Input type ='text' name='state' autocomplete="new-password" autofill="off" setfieldsvalue={values.state} onChange={handleChange} onFocus={onFocus}/>)}
          </Form.Item>
          <Form.Item label="Zipcode">
          {getFieldDecorator('zipcode', {
            rules: [
              {
                required: true,
                message: 'Please input your zipcode',
              },
            ],
          })(<Input type ='text' name='zipcode' autocomplete="new-password" autofill="off" setfieldsvalue={values.zipcode} onChange={handleChange} onFocus={onFocus} />)}
          </Form.Item>
          </div>
          </div>
        <Divider>Admin Details</Divider>
        <div className='col-sm-5'>
        <Form.Item label="Firstname">
        {getFieldDecorator('firstname', {
            rules: [{
                required: true,
                message: 'Please input your Firstname',
              },
            ],
          })(
         <Input name='firstname' autocomplete="new-password" autofill="off" setfieldsvalue={values.firstname} onChange={handleChange} onFocus={onFocus} />)}
        </Form.Item>
        <Form.Item label="Lastname">
        {getFieldDecorator('lastname', {
            rules: [{
                required: true,
                message: 'Please input your Lastname',
              },
            ],
          })(
         <Input name='lastname' autocomplete="new-password" autofill="off" setfieldsvalue={values.lastname} onChange={handleChange} onFocus={onFocus}/>)}
        </Form.Item>
        <Form.Item label="E-mail">
        {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
         <Input name='email' autocomplete="new-password" autofill="off" setfieldsvalue={values.email} onChange={handleChange} onFocus={onFocus} />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password name='password' autocomplete="new-password" autofill="off" setfieldsvalue={values.password} onChange={handleChange} onFocus={onFocus}/>)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password autocomplete="new-password" autofill="off" onBlur={handleConfirmBlur} onFocus={onFocus} />)}
        </Form.Item>
        </div>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={success(practice.isRegistered)}>
            Register
          </Button>
        </Form.Item>
        
      </Form>
      
      </div>
    )
}

export default Form.create({
    name: 'register'
  })(withRouter(PracticeForm));
 


