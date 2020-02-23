/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import HeaderBox from '@/components/HeaderBox';

const BasicLayout = props => {
  const { dispatch, children } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  return (
    <div>
      <HeaderBox {...props} type={2}></HeaderBox>
      <div style={{ backgroundColor: '#EFF1F5' }}>{children}</div>
    </div>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  authorizedMenus: user.authorizedMenus,
  settings,
}))(BasicLayout);
