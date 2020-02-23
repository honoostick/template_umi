/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import styles from './style.less'
import pic1 from '../../assets/mh@2x.png'
import pic2 from '../../assets/ggh@2x.png'
import pic3 from '../../assets/zs.png'

@connect(({ user }) => ({ user }))
class page extends Component {
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

  handleRedirect = path => () => {
    if (
      path === '/center/brandcenter/mutationDemand' &&
      (!this.checkedLoginStatus() || !this.chekedAuthentStatus())
    ) {
      router.push('/login')
    } else if (
      path === '/center/brandcenter/mutationDemand' &&
      this.checkedLoginStatus() &&
      this.chekedAuthentStatus()
    ) {
      router.push(path)
    } else {
      router.push(path)
      window.location.reload()
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <div className={styles['zbj-footer-warp-v1']}>
        <div className={styles['zbj-footer-cutting-line']} />
      </div>
    )
  }
}

export default page
