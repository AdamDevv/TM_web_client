export enum TranslationContractStatus
{
    New,
    InProgress,
    Completed,
}

export interface TranslationContract {
  uid: string;
  status: TranslationContractStatus;
  price: number;
  customerUid: string;
  translatorUid: string;
}