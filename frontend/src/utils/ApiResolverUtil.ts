import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { apiConf } from "../api/api.conf.ts";

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
    jwt?: string,
    responseType?: AxiosResponse["request"]["responseType"],
  ): Promise<S> {
    const fullUrl = `${apiConf.endpoint}/${this.endpoint}/${url}`;

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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status || error.response?.data?.status || 500,

          message: error.response?.data?.message?.split?.(":")?.[1]
            ? error.response.data.message.split(":")[1]
            : error.response?.data?.message ||
              error.message ||
              "Ошибка сервера",
        } as S;
      }
      return {
        status: 500,
        message: "Неизвестная ошибка",
      } as S;
    }
  }
}

export default ApiResolverUtil;