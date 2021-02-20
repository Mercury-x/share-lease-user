import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://software.remotehost.icu';

export interface HttpSuccessData<T> {
  status: 0;
  message: string;
  data: T;
}

export interface HttpErrorData {
  status: 1001;
  message: string;
}

export type HttpData<T> = HttpSuccessData<T> | HttpErrorData;

export async function httpBase<Req, Res>(method: 'get' | 'post' | 'put', url: string, data: Req): Promise<Res> {
  let resData: AxiosResponse<HttpData<Res>>;
  switch (method) {
    case 'get':
      resData = await axios
        .get<HttpData<Res>>(url, {
          params: data,
        })
        .catch((err: AxiosError<HttpData<Res>>) => {
          console.log(err);
          if (err.response) {
            throw new Error(err.response.data.message);
          }
          throw new Error('网络错误');
        });
      break;
    case 'post':
      resData = await axios.post<HttpData<Res>>(url, data).catch((err: AxiosError<HttpData<Res>>) => {
        console.log(err);
        if (err.response) {
          throw new Error(err.response.data.message);
        }
        throw new Error('网络错误');
      });
      break;
    case 'put':
      resData = await axios.put<HttpData<Res>>(url, data).catch((err: AxiosError<HttpData<Res>>) => {
        console.log(err);
        if (err.response) {
          throw new Error(err.response.data.message);
        }
        throw new Error('网络错误');
      });
      break;
  }
  if (resData.data.status === 0) {
    return resData.data.data;
  }
  throw new Error(resData.data.message);
}

export async function httpGet<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('get', url, data);
}

export async function httpPost<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data);
}

export async function httpPut<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('put', url, data);
}
