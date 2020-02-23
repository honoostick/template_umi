/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

const CenterLayout = props => {
  const { dispatch, children } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  return (
    <DocumentTitle title="defaultTitle">
      <div style={{ backgroundColor: '#EFF1F5' }}>{children}</div>
    </DocumentTitle>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  authorizedMenus: user.authorizedMenus,
  settings,
}))(CenterLayout);
