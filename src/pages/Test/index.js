/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Map, Marker } from 'react-bmap'
import { Timeline } from 'antd';
import uuid from 'uuid';
import quote1Img from '@/assets/test.png';
import quote2Img from '@/assets/test.png';
import icon1Img from '@/assets/test.png';
import icon2Img from '@/assets/test.png';
import icon3Img from '@/assets/test.png';
import locImg from '@/assets/test.png';
import phoneImg from '@/assets/test.png';
import mailImg from '@/assets/test.png';
import transImg from '@/assets/test.png';
import styles from './style.less';

@connect(({ aboutUs }) => ({ ...aboutUs }))
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'fetch',
    });
  }

  renderInfo = () => (
    <div className={styles.info}>
      <div className={styles.content}>
        <div className={styles.title}>简介</div>
        <div className={styles.title2}>SUCCESSFUL CASE</div>
        <div className={styles.text}>
          <p>奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间</p>
          <p>奥斯帆欧查三发偶爱三扥奥斯单反拉空间
奥斯帆欧查三发偶爱三扥奥斯单反拉空间
奥斯帆欧查三发偶爱三扥奥斯单反拉空间
奥斯帆欧查三发偶爱三扥奥斯单反拉空间
奥斯帆欧查三发偶爱三扥奥斯单反拉空间
          奥斯帆欧查三发偶爱三扥奥斯单反拉空间</p>
        </div>
        <img className={styles['left-mark']} src={quote1Img} alt="" />
        <img className={styles['right-mark']} src={quote2Img} alt="" />
      </div>
    </div>
  )

  renderDetail = () => {
    const { timeLineData } = this.props;
    const { Item: TimeItem } = Timeline;
    return (
      <div className={styles.detail}>
        <div className={styles.left}>
          <div className={styles.item}>
            <img src={icon1Img} alt="" />
            <div className={styles.text}>
              <div className={styles.title}>速度</div>
              <div className={styles.content}>奥斯扥哦产个<br />熬成瓦斯弹</div>
            </div>
          </div>
          <div className={styles.item}>
            <img src={icon2Img} alt="" />
            <div className={styles.text}>
              <div className={styles.title}>奥斯扥哦产个</div>
              <div className={styles.content}>奥斯扥奥斯扥啊<br />奥斯扥阿僧全国</div>
            </div>
          </div>
          <div className={styles.item}>
            <img src={icon3Img} alt="" />
            <div className={styles.text}>
              <div className={styles.title}>奥斯扥</div>
              <div className={styles.content}>奥斯扥GRE<br />H奥斯扥而为之</div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Timeline className={styles['time-container']}>
            {
              timeLineData && timeLineData.map(v => (
                <TimeItem key={uuid()} dot={<div className={styles['time-dot']} />}>
                  <div className={`${styles['time-line']} ${v.year && styles['year-fix']}`}>
                    {v.year && <div className={styles.time}>{v.year}</div>}
                    <div className={`${styles.text} ${v.year && styles['text-fix']}`}>{v.value}</div>
                  </div>
                </TimeItem>
              ))
            }
          </Timeline>
        </div>
      </div>
    )
  }

  renderContract = () => (
    <div className={styles.contract}>
      <div className={styles.part1}>
        <div className={styles.title}>阿瓜尔</div>
        <div className={styles.content}>奥斯登邱娥国骄傲锁单</div>
      </div>
      <div className={styles.part2}>
        <div className={styles.item}>
          <img src={locImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>奥斯扥/奥斯扥</div>
            <div className={styles.content}>奥斯扥奥森奥斯扥号<br />奥斯扥阿狗王二狗</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={phoneImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>月入团名特惠他</div>
            <div className={styles.content}>扥刚当天和没注册聂翠</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={mailImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>扥个人唐否小</div>
            <div className={styles.content}>asgo二级果女促销</div>
          </div>
        </div>
      </div>
    </div>
  )

  renderMap = () => (
    <div className={styles.map}>
      <Map
        style={{
          height: '45vw',
        }}
        center={{ lng: 118, lat: 30 }}
        zoom="16">
        <Marker position={{ lng: 118, lat: 30 }} />
      </Map>
      <div className={styles.widget}>
        <div className={styles.item}>
          <img src={transImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>波斯菊口臭叫哦必须</div>
            <div className={styles.content}>小锤欧版we若产国</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={transImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>晓波is仍龙蛋</div>
            <div className={styles.content}>奥迪版哦小菊</div>
          </div>
        </div>
        <div className={styles.item}>
          <img src={transImg} alt="" />
          <div className={styles.text}>
            <div className={styles.title}>别错衰而我却开销你</div>
            <div className={styles.content}>苏丹国产小白就</div>
          </div>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div className={styles.container}>
        {/* <div className={styles.banner} /> */}
        {this.renderInfo()}
        {this.renderDetail()}
        {this.renderContract()}
        {this.renderMap()}
      </div>
    );
  }
}

export default Page;
