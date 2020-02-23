/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title';
import HeaderBox from '@/components/HeaderBox'
import Footer from '@/components/Footer'
import styles from './layout.less'

const BasicLayout = props => {
  const { dispatch, children } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      })
    }
  }, [])

  return (
    <DocumentTitle title="defaultTitle">
      <div>
        <HeaderBox {...props} type={1} />
        <div className={styles.minHeight}>{children}</div>
        <Footer />
      </div>
    </DocumentTitle>
  )
}

export default connect(({ global, settings, user, demandDetail, serviceDetail }) => ({
  collapsed: global.collapsed,
  authorizedMenus: user.authorizedMenus,
  settings,
  demandDetail,
  serviceDetail,
}))(BasicLayout)
