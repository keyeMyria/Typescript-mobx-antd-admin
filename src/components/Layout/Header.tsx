import React, { PropTypes } from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import { Menus } from './Menu'
import { Location } from 'mobx-react-router'

const SubMenu = Menu.SubMenu

interface IProps {
  user: any,
  logout: () => void,
  switchSider: (...args) => any,
  siderFold: boolean,
  isNavbar: boolean,
  menuPopoverVisible: boolean,
  location: Location,
  switchMenuPopover: (visible: boolean) => void,
  navOpenKeys: Array<string>,
  changeOpenKeys: (nextOpenKeys: Array<string>) => void
}

function Header ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys }: IProps) {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {user.username} </span>}
          >
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}


export { Header }
