export enum TranslatorStatus
{
    Applicant,
    Certified,
}

export interface Translator {
  uid: string;
  name: string;
  hourlyRate: number;
  status: TranslatorStatus;
  creditCardNumber: string;
}