import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router'
import styles from './Bread.less'
import { menu } from '../../utils'
import { IMenuKey } from '../../utils/menu'

let pathSet = []
const getPathSet = function (menuArray: Array<IMenuKey>, parentPath: string|undefined) {
  parentPath = parentPath || '/'
  menuArray.forEach(item => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    }
    if (item.child) {
      getPathSet(item.child, `${parentPath}${item.key}/`)
    }
  })
}
getPathSet(menu, undefined)

function Bread ({ location }: { location: string }) {
  let pathNames:Array<string> = []
  location.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump())
    } else {
      pathNames.push((`-${item}`).hyphenToHump())
    }
  })

  const breadsArray = pathNames.filter(item => (item in pathSet))
  const breads = breadsArray.map((item, key) => {
    const content = (
      <span>{pathSet[item].icon
          ? <Icon type={pathSet[item].icon} style={{ marginRight: 4 }} />
          : ''}{pathSet[item].name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((breadsArray.length - 1) !== key && pathSet[item].clickable)
          ? <Link to={pathSet[item].path}>
              {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item >
          <Link to="/dashboard">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}


export { Bread }
