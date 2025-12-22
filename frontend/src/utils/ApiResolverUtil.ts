import axios, { type AxiosRequestConfig, type AxiosResponse, isAxiosError } from "axios";
import { apiConf } from "../api/api.conf.ts";
import { store } from "@/store";

interface RequestConfig<T> extends AxiosRequestConfig {
  data?: T;
}

class ApiResolverUtil {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async request<U, S>(
    url: string,
    method: string,
    data?: U,
    responseType?: AxiosResponse["request"]["responseType"],
  ): Promise<S> {
    const fullUrl = `${apiConf.endpoint}/${this.endpoint}/${url}`;
    const jwt = store.getState().auth.accessToken;

    const config: RequestConfig<U> = {
      url: fullUrl,
      method,
      data,
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : null,
      },
      responseType: (responseType || "json") as never,
    };

    try {
      const response: AxiosResponse<S> = await axios(config);
      return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        return {
          status: error.response?.data.status,
          data: error.response?.data.data
        } as S;
      }
      if (!error.response) {
        return {
          status: error.name,
          data: error.message
        } as S;
      }
      return {
        status: 500,
        data: "Неизвестная ошибка",
      } as S;
    }
  }
}

export default ApiResolverUtil;