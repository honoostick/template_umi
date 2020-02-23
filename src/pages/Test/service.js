import request from '@/utils/request';

export function getData() {
  return request('/dms/getData', { method: 'GET' });
}
