import React,{useState} from 'react'
import { Layout, Menu,  Icon } from 'antd';
import {Link ,  BrowserRouter as Router , Route } from 'react-router-dom'

import PForm from '../../pages/Practice/PracticeForm'
import ListPractice from '../../pages/Practice/Tableimp'
import styles from './style.module.scss'
import logo from './logo.png'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const routes = [
  {
    path: "/listpractice",
    exact:true,
    main: () => <div><ListPractice/></div>

  },
  {
    path: "/pform",
    main: () => <div><PForm /></div>
  }
];


export default function NavBar() {
    const[values,setValues] = useState({
        collapsed: false
    })

   const  onCollapse = collapsed => {
        console.log(collapsed);
        setValues({ collapsed });
      };
     
    return (
      <Router>
        <Layout>
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px'}}
      >
        <Menu.Item key="1" style={{float:'right'}}><Link to='/listpractice'>Home</Link></Menu.Item>
        <Menu.Item key="2" style={{float:'right'}}>Logout</Menu.Item>
        <Menu.Item key='3' style={{float:'left'}}>  <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="logo" />
          </div>
        </div></Menu.Item>
      </Menu>
    </Header>
    <Layout>
       <Sider collapsible collapsed={values.collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <Link to='/pform'>
              <Icon type="plus" />
              <span>Practice</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to='/listpractice'>
              <Icon type="file" />
              <span>List Practice</span>
            </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Provider List</Menu.Item>
              <Menu.Item key="4">Staff List</Menu.Item>
              <Menu.Item key="5">Patient List</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>Help</span>
            </Menu.Item>
          </Menu>
        </Sider>
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* {routes ? <Tableimp /> : null} */}
          {
            routes.map((route,index) => (
            <Route 
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}/>
       ))} 
        </Content>
      
      </Layout>
    </Layout>
  </Layout>
  </Router>
    )
}
