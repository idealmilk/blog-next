import axios, { AxiosRequestConfig } from "axios";

export type TFetchResponse<T> = Promise<
  | T
  | {
      error: {
        title: string;
        message: string;
        isNetworkError?: boolean;
      };
      status: number;
    }
>;

export const fetchWithErrorHandling = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<TFetchResponse<T>> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (options.method) {
    headers["Content-Type"] = "application/json";
  }

  // const token = await getToken()
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }

  // eslint-disable-next-line no-console
  console.log(`Trying to ${options.method || "GET"} from ${url}`);

  if (options.method === "POST") {
    // eslint-disable-next-line no-console
    console.log(
      "with data",
      JSON.stringify(JSON.parse(options.data), undefined, 2)
    );
  }

  const response = await axios({
    url,
    headers,
    // timeout: 10000,
    validateStatus: (status: number) => status >= 200 && status < 400,
    ...options,
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(
      "Error with",
      e?.response?.data?.message || "",
      "statusCode:",
      e?.response?.status || ""
    );
    const errorText = (`${e.response?.data.message}` as string).split("\n");
    const title = errorText.shift() || "";
    const message = errorText.join("\n") || "";
    const res = {
      error: {
        title:
          "response" in e &&
          e.response?.status === 400 &&
          e.response?.data instanceof Object &&
          "message" in e.response.data
            ? title
            : "通信に失敗しました。再度実行してください。",
        message,
        isNetworkError: !("response" in e),
      },
      status: e.response?.status,
    };
    // if (res.status === 401) {
    //   forceLogout()
    // }
    // if (res.error.isNetworkError) {
    //   mutate(SWR_KEYS.toast, '通信エラーが発生しました\nインターネット接続をご確認の上、再度お試しください')
    // }
    return res;
  });
  if ("error" in response) {
    return response;
  }
  // eslint-disable-next-line no-console
  console.log("Response:", JSON.stringify(response.data, null, 2));
  return response.data;
};

export const get = <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<TFetchResponse<T>> => {
  return fetchWithErrorHandling<T>(url, {
    method: "GET",
    ...options,
  });
};

export const post = <T>(
  url: string,
  body?: Record<string, unknown> | FormData | File,
  options: AxiosRequestConfig = {}
): Promise<TFetchResponse<T>> => {
  const data = JSON.stringify(body || {});
  return fetchWithErrorHandling(url, {
    method: "POST",
    data,
    ...options,
  });
};

export const put = <T>(
  url: string,
  body: Record<string, unknown> | FormData | File,
  options: AxiosRequestConfig = {}
): Promise<TFetchResponse<T>> => {
  const data = JSON.stringify(body || {});
  return fetchWithErrorHandling(url, {
    method: "PUT",
    data,
    ...options,
  });
};

export const destroy = <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<TFetchResponse<T>> => {
  return fetchWithErrorHandling(url, { method: "DELETE", ...options });
};
