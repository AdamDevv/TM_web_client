import { ApiResult } from "./ApiResult";

export interface ApiResultValue<ResultCodeType, ResultType> extends ApiResult<ResultCodeType> {
  value: ResultType
}