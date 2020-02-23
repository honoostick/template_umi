/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';

@connect(({ Home }) => ({ ...Home }))
class Page extends Component {
  render() {
    return (
      <div className={styles.container}>
        Hello
      </div>
    );
  }
}

export default Page;
