import React, { useState } from 'react';
import { Avatar } from 'antd';
import router from 'umi/router';
import uuid from 'uuid';
import { FlexClomn, FlexDivider } from '@/components/Flex';
import styles from './style.less';

const Tags = ({ data = [], className }) => (
  <ul className={`${styles.tags} ${className}`}>
    {
      data.filter(tag => !!tag).map(tag => <li className={styles.tag} key={uuid()}>{tag}</li>)
    }
  </ul>
);

const HAS_FOLLOWED = 1;
const HAS_NOT_FOLLOWED = 0;

const DesignerItem = ({
  headImage,
  userId,
  nickName,
  // sex,
  // birthday,
  // occupationName,
  province,
  city,
  // createTime,
  onFollowBtnClick = () => { },
  fieldList,
  // fieldList = { fieldId: '', fieldName: '' },
  autograph,
  isFollow,
  worksNo,
  fansNo,
  myUserId,
  // auditStatus
}) => {
  const hasFollowed = Number(isFollow) === HAS_FOLLOWED;
  return (
    <li className={styles.item} onClick={
      () => {
        if (userId === myUserId) {
          window.open('/center/designercenter/home');
        } else {
          window.open(`/center/designercenter/home?id=${userId}`);
        }
      }}>
      <header>
        <FlexClomn>
          <Avatar style={{ flex: 'none' }} size={90} src={headImage || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
          <div className={styles.detail}>
            <div className={`${styles.name} GMLL-1`}>{nickName}</div>
            <div className={styles.addr}>{province} {city}</div>
            <Tags className={`${styles.tags}`} data={fieldList && fieldList.map(item => item.fieldName)} />
          </div>
        </FlexClomn>
      </header>
      <article className="GMLL-2">
        {autograph}
      </article>
      <footer>
        <FlexClomn>
          <div className={styles['bottom-text']}><span>作品</span> {worksNo}</div>
          <FlexDivider type="vertical" />
          <div className={styles['bottom-text']}><span>粉丝</span> {fansNo}</div>
          {
            userId !== myUserId &&
            <button
              className={styles.followBtn}
              onClick={evt => {
                evt.stopPropagation();
                onFollowBtnClick(userId, !hasFollowed);
              }}
              type="button"
            >
              {hasFollowed ? '已关注' : '关注'}
            </button>
          }
        </FlexClomn>
      </footer>
    </li>
  );
}

export default ({ data = [], ...rest }) =>
  (<div className={styles.container}>
    <ul className={styles[`remain-${data.length % 4}`]}>
      {
        data && data.map(item => <DesignerItem key={uuid()} {...item} {...rest} />)
      }
    </ul>
  </div>);
