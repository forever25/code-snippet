import axios from "axios";
import router from '@/router/index.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import qs from 'qs';

const successCode = [200]

/**
 *
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      ElMessageBox.confirm('您已掉线，或者访问权限出错，请重新登录！', '重新登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          router.push({ path: '/login' });
        })
        .catch(() => { });
      ElMessage.error(msg);
      break;
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => { });
      break;
    default:
      ElMessage.error(msg || `后端接口${code}异常`);
      break;
  }
};

const server = axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
});

// 前置拦截器
server.interceptors.request.use(
  config => {
    // if (sessionStorage.getItem('Token')) {
    //   config.headers['token'] = sessionStorage.getItem('Token');
    // }
    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 后置拦截器
server.interceptors.response.use(
  response => {
    const res = response.data;
    const { data } = response;
    const { code, msg } = data;
    try {
      // 操作成功
      if (successCode.includes(code) && successCode.includes(res.code)) {
        return res;
      } else {
        handleCode(code, msg);
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  },
  error => {
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常';
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        message = '后端接口' + code + '异常';
      }
      ElMessage.error(message || `后端接口未知异常`);
      return Promise.reject(error);
    }
  }
);

/**
 * @description: get请求
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export function getRequest(url, params = {}) {
  return server({
    method: 'GET',
    url: url,
    params: params,
  });
}

/**
 * @description: post请求
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export function postRequest(url, params = {}) {
  return server({
    method: 'POST',
    url: url,
    data: params,
  });
}

/**
 * @description: put请求
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export function putRequest(url, params = {}) {
  return server({
    method: 'PUT',
    url: url,
    data: params,
  });
}

/**
 * @description: delete请求
 * @param {*} url
 * @param {*} params
 * @return {*}
 */
export function deleteRequest(url, params = {}) {
  return server({
    method: 'DELETE',
    url: url,
    params: params,
  });
}

export default server;
