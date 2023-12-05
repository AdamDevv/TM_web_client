import { CommonApiResultCode } from "../model/resultCodes/CommonApiResultCode";
import { CreateTranslationItemResultCode } from "../model/resultCodes/CreateTranslationItemResultCode";
import { TranslationContract, TranslationContractStatus } from "../model/translationContracts/TranslationContract";
import { TranslationContractWithNames } from "../model/translationContracts/TranslationContractWithNames";
import { fetchApiResult, fetchApiResultValue } from "../utils/apiUtils";

export const getAllTranslationContracts = () => {
  return fetchApiResultValue<CommonApiResultCode, TranslationContract[]>("translation-contracts", 'GET')
};

export const getAllTranslationContractsWithNames = () => {
  return fetchApiResultValue<CommonApiResultCode, TranslationContractWithNames[]>(`translation-contracts/with-names`, 'GET')
};

export const getTranslationContract = (uid: string) => {
  return fetchApiResultValue<CommonApiResultCode, TranslationContract>(`translation-contracts/${uid}`, 'GET')
};

export const createTranslationContract = (customerUid: string, content: string, price?: number, translatorUid?: string) => {
  return fetchApiResultValue<CreateTranslationItemResultCode, string>(`translation-contracts`, 'POST', JSON.stringify({ 
    customerUid,
    content,
    price,
    translatorUid,
  }));
}

export const updateTranslationContract = (uid: string, price: number) => {
  return fetchApiResult<CommonApiResultCode>(`translation-contracts`, 'PUT', JSON.stringify({
    uid,
    price
  }));
}

export const deleteTranslationContract = (uid: string) => {
  return fetchApiResult<CommonApiResultCode>(`translation-contracts/${uid}`, 'DELETE');
}

export const updateTranslationContractStatus = (uid: string, status: TranslationContractStatus) => {
  return fetchApiResult<CommonApiResultCode>(`translation-contracts/${uid}/status?${new URLSearchParams({ "status": String(status) })}`, 'PUT');
}