import React,{useState} from 'react'
import {Menu , Icon, Layout} from 'antd'
import {Link  } from 'react-router-dom'

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function MenuLeft() {
    const[values,setValues] = useState({
        collapsed: false
    })

   const  onCollapse = collapsed => {
        console.log(collapsed);
        setValues({ collapsed });
      };
   
    return (

            <Sider collapsible collapsed={values.collapsed} onCollapse={onCollapse} >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <Link to='/dashboard'>
              <Icon type="file" />
              <span>List Practice</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="2"> 
            <Link to='/pform'>
              <Icon type="plus" />
              <span>Practice</span>
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
        
    )
}
