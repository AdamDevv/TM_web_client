import { Customer } from "../model/customers/Customer";
import { CommonApiResultCode } from "../model/resultCodes/CommonApiResultCode";
import { fetchApiResult, fetchApiResultValue } from "../utils/apiUtils";

export const getAllCustomers = () => {
  return fetchApiResultValue<CommonApiResultCode, Customer[]>("customers", 'GET')
};

export const getCustomer = (uid: string) => {
  return fetchApiResultValue<CommonApiResultCode, Customer>(`customers/${uid}`, 'GET')
};

export const createCustomer = (name: string) => {
  return fetchApiResultValue<CommonApiResultCode, string>(`customers`, 'POST', JSON.stringify({ 
    name
  }));
}

export const updateCustomer = (customer: Customer) => {
  return fetchApiResult<CommonApiResultCode>(`customers`, 'PUT', JSON.stringify(customer));
}

export const deleteCustomer = (uid: string) => {
  return fetchApiResult<CommonApiResultCode>(`customers/${uid}`, 'DELETE');
}