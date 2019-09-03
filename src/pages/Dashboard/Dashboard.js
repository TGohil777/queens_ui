import React,{useState} from 'react'
import { Layout, Menu,  Icon } from 'antd';
import {Link ,  BrowserRouter as Router , Route , withRouter } from 'react-router-dom'

import PForm from '../../pages/Practice/PracticeForm'
import ListPractice from '../../pages/Practice/Tableimp'
import MenuTop from '../../components/Menu/MenuTop'
import MenuLeft from '../../components/Menu/MenuLeft'
import ViewPractice from '../../pages/Practice/SinglePractice/ViewPractice'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const routes = [
  {
    path: "/dashboard",
    main: () => <div><ListPractice/></div>

  },
  {
    path: "/pform",
    main: () => <div><PForm /></div>
  },
  {
    path: "/viewpractice",
    main: () => <div><ViewPractice /></div>
  }
];


function NavBar() {
     
    return (
      <Router>
        <Layout>
    <Header className="header">
     <MenuTop />
    </Header>
    <Layout>
     <MenuLeft />
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
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

export default (withRouter(NavBar))