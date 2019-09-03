import React from 'react'
import {Menu , Icon} from 'antd'
import styles from './style.module.scss'
import logo from './logo.png'
import {Link  } from 'react-router-dom'
import {logoutUser} from '../../state/ducks/auth'
function MenuTop() {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = '/login';
  }
    return (
        <div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px'}}
      >
        <Menu.Item key="1" style={{float:'right'}}><Link to='/dashboard'>Home</Link></Menu.Item>
        <Menu.Item key="2" style={{float:'right'}}><Link onClick={onLogoutClick}>Logout</Link></Menu.Item>
        <Menu.Item key='3' style={{float:'left'}}>  <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="logo" />
          </div>
        </div></Menu.Item>
      </Menu>
        </div>
    )
}

export default MenuTop;