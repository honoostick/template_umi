import BigNumber from 'bignumber.js';
import JSONBig from 'json-bigint';
import moment from 'moment';

const JSONWeak = JSONBig({ storeAsString: true });

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const inputReg = value => /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value);

const inputSpaceReg = value => /^[^\s]*$/.test(value);

const phoneNumberReg = value => /^1[3-9]\d{9}$/.test(value);

const isUrl = path => reg.test(path);

const isAntDesignPro = () => false;

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

/**
 * @param {Number} input 输入分
 * @returns {Number} 输出元
 */
const displayYuan = input =>
  BigNumber(input || 0)
    .dividedBy(100)
    .toNumber();

const displayFen = input =>
  BigNumber(input || 0)
    .multipliedBy(100)
    .toNumber();

/**
 *金额输入框的小数限制
 */
const testMoney = (input, precision = 2) =>
  RegExp(`^(?:(?:(?:[1-9]\\d*)|0)(?:\\.|(?:\\.\\d{0,${precision}}))?)?$`).test(`${input}`);

const jsonParse = string => JSONWeak.parse(string);

const jsonStringify = obj => JSONWeak.stringify(obj);
// 转义时间
const timeParse = time => {
  // replace 兼容safari
  const d = new Date(time.replace(/-/g, '/'));
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  }

  if (diff < 3600) {
    // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`;
  }
  if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  }
  if (diff < 3600 * 24 * 30) {
    return `${Math.ceil(diff / 86400)}天前`;
  }

  console.log(time, d, d.getTime(), d.getFullYear());

  return `${d.getFullYear()}-${d.getMonth() +
    1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const timeParse2 = time => moment(time).format('YYYY-MM-DD HH:mm');

// 阿拉伯数字转汉字
const SectionToChinese = section => {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千', '万', '亿', '万亿', '亿亿'];
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    // eslint-disable-next-line no-plusplus
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

export {
  isAntDesignPro,
  isUrl,
  isDev,
  isProd,
  displayYuan,
  displayFen,
  jsonParse,
  jsonStringify,
  inputReg,
  testMoney,
  inputSpaceReg,
  timeParse, // 转义时间
  timeParse2,
  SectionToChinese,
  phoneNumberReg,
};
