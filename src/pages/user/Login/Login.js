import React  from 'react'
import { Form, Input, Button, Icon  } from 'antd'
import { Helmet } from 'react-helmet'
import { useForm } from '../../../hooks/useForm';
import styles from './style.module.scss'
import { loginUser } from '../../../state/ducks/auth';
import useStore from '../../../state/useStore';
import logo from './logo.png'
import { withRouter } from 'react-router-dom';



const initialValue = {
  email: "",
  password: ""
}

function Login({form, history}){
  let message = [];
   const { getFieldDecorator } = form
    const [values, handleChange] = useForm({
      ...initialValue
    });

    const [{ auth } , dispatch ] = useStore();

    console.log("Auth", JSON.stringify(auth, null, 3));

    const handleSubmit = (e)=> {
      e.preventDefault();
      form.validateFields((err , val) => {
      if(!err){
      loginUser(values, dispatch, history)
      }
    })
}
// const validatePassword = (rule, values, callback) => {
//   if (auth.login.error) {
//     callback(`${auth.login.error}`);
//   } else {
//     callback("web address is invalid")
//   }
// }
if(auth.login.error){
  message = auth.login.error ;
}
  return (
    <div>
      <Helmet title="Login" />
      <div className={`${styles.title} login-heading`}>
      <img src={logo} alt='bvitals logo' style={{height:'auto',maxWidth: '100%'}}/>
      </div>
        <div className={styles.block}>
        <div className="row">
          <div className="col-xl-12">
            <div className={styles.inner}>
              <div className={styles.form}>
                <h1 className="text-uppercase">
                  <strong>Log in</strong>
                </h1>
                <br />
                <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                  <Form.Item label="Email">
                    {getFieldDecorator('email', {
                      rules: [
                        { 
                          type: 'email', 
                          message : 'The input is not valid E-mail!' },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],})(
                    <Input size="default" 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Email'
                    setfieldsvalue={values.email}
                    name='email'
                      onChange={handleChange}/>
                       )} 
                  </Form.Item>
                  <Form.Item label="Password">
                    {getFieldDecorator('password', {
                    rules: [{
                       required: true, 
                       message: 'Please input your password' },
                    {
                     // validator: validatePassword,
                    }
                  ],
                    })(
                    <Input size="default" type="password"
                    placeholder='Password'
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  setfieldsvalue={values.password} 
                    name='password' onChange={handleChange}/>
                     )} 
                  </Form.Item>
                  <Form.Item>
                    <a
                      href="/user/forgot"
                      className="utils__link--blue utils__link--underlined pull-left"
                    >
                      Forgot password?
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      //className="width-150 mr-4"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}


export default Form.create({
     name: 'normal_login'
   })(withRouter(Login));
  
  
