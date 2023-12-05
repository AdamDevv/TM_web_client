import { TranslationContract } from "./TranslationContract";

export interface TranslationContractWithNames extends TranslationContract {
  customerName: string;
  translatorName?: string;
}