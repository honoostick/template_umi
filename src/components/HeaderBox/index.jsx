/* eslint-disable func-names */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/no-unused-state */
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
// import { url } from 'inspector';
import styles from './index.less'
import config from '../../../config/config'

@connect(({ user }) => ({ user }))
class HeaderBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuKey: '',
      commonTitle: '',
      showPanel: false,
      isFixed: false,
      isHome: true,
      selectIndex: 0,
    }
  }

  // componentWillMount() {
  //   const { location } = this.props;
  //   const { pathname } = location;
  //   if (pathname === '/') {
  //     this.setState({ isFixed: false })
  //   } else {
  //     this.setState({ isFixed: true })
  //   }
  // }

  componentWillUnmount() {
    this.removeScrollListener()
  }

  bindHandleScroll = event => {
    const scrollTop =
      (event.srcElement ? event.srcElement.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (event.srcElement ? event.srcElement.body.scrollTop : 0)
    if (scrollTop > 10) {
      this.setState({ isFixed: true })
    } else {
      this.setState({ isFixed: false })
    }
  }

  hideMenu = () => {
    this.setState({
      showPanel: false,
    })
  }

  activeKey = async () => {
    const menuRoutes = config.routes.filter(item => item.menuKey === 'main')[0].routes // 获取菜单入口路由
    const pathName = this.props.location.pathname
    await this.getMenuRoute(pathName, menuRoutes)
  }

  // 获取路由
  getMenuRoute = (pathName, menuRoutes, menuKey) => {
    menuRoutes.forEach(item => {
      if (pathName === item.path) {
        this.setState({ menuKey: menuKey || item.menuKey })
      }
      if (item.routes && item.routes.length > 0) {
        this.getMenuRoute(pathName, item.routes, menuKey || item.menuKey)
      }
    })
  }

  addScrollListener = () => {
    window.addEventListener('scroll', this.bindHandleScroll)
  }

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.bindHandleScroll)
  }

  handleRedirect = (path, menuKey) => () => {
    router.push(path)
    this.setState({ menuKey })
    this.setState({ isFixed: false, selectIndex: 0 })
    const { scrollY } = window
    if (scrollY > 10) {
      this.setState({ isFixed: true })
    } else {
      this.setState({ isFixed: false })
    }
    this.addScrollListener()
  }

  checkedLoginStatus = () => {
    const { user } = this.props
    return Object.keys(user.currentUser).length !== 0
  }

  chekedAuthentStatus = () => {
    const { user } = this.props
    return (
      user.currentUser.auditStatus === 1 ||
      user.currentUser.auditStatus === 3 ||
      user.currentUser.auditStatus === 4
    )
  }

  render() {
    // const { location, type, user } = this.props;
    const { location } = this.props

    const { pathname } = location
    // const { showPanel } = this.state;
    // const userName = user && user.currentUser && user.currentUser.name ? user.currentUser.name : '';
    let isHome = true
    if (pathname === '/') {
      isHome = true
    } else {
      isHome = false
    }

    return (
      <div className={`${isHome ? styles['box-home'] : styles.box}`}>
        <div className={styles.boxMain}>
        </div>
        <div className={styles.clear}></div>
      </div>
    )
  }
}
export default HeaderBox
