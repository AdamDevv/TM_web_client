import { CommonApiResultCode } from "../model/resultCodes/CommonApiResultCode";
import { Translator, TranslatorStatus } from "../model/translators/Translator";
import { fetchApiResult, fetchApiResultValue } from "../utils/apiUtils";

export const getAllTranslators = (onlyCertified: boolean = false) => {
  return fetchApiResultValue<CommonApiResultCode, Translator[]>(`translators?${new URLSearchParams({ "onlyCertified": String(onlyCertified) })}`, 'GET')
};

export const getTranslator = (uid: string) => {
  return fetchApiResultValue<CommonApiResultCode, Translator>(`translators/${uid}`, 'GET')
};

export const createTranslator = (name: string, hourlyRate: number, creditCardNumber: string) => {
  return fetchApiResultValue<CommonApiResultCode, string>(`translators`, 'POST', JSON.stringify({ 
    name,
    hourlyRate,
    creditCardNumber
  }));
}

export const updateTranslator = (uid: string, name: string, hourlyRate: number, creditCardNumber: string) => {
  return fetchApiResult<CommonApiResultCode>(`translators`, 'PUT', JSON.stringify({
    uid,
    name,
    hourlyRate,
    creditCardNumber
  }));
}

export const deleteTranslator = (uid: string) => {
  return fetchApiResult<CommonApiResultCode>(`translators/${uid}`, 'DELETE');
}

export const updateTranslatorStatus = (uid: string, status: TranslatorStatus) => {
  return fetchApiResult<CommonApiResultCode>(`translators/${uid}/status?${new URLSearchParams({ "status": String(status) })}`, 'PUT');
}