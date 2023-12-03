import { ApiResult } from "../model/results/ApiResult";
import { ApiResultValue } from "../model/results/ApiResultValue";

const API_URL = "http://localhost:7729/api/v1/";

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export function fetchApiResult<ResultCodeType>(
  url: string, 
  method: HttpMethod, 
  body: BodyInit | undefined = undefined
): Promise<ApiResult<ResultCodeType>> {
  return fetch(`${API_URL}${url}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => response.json());
}

export function fetchApiResultValue<ResultCodeType, ResultType>(
  url: string, 
  method: HttpMethod, 
  body: BodyInit | undefined = undefined
): Promise<ApiResultValue<ResultCodeType, ResultType>> {
  return fetch(`${API_URL}${url}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => response.json());
}