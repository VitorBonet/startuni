import { IUserDTOS } from "./IUserDTOS";

interface ICountry {
  id: number;
  code: string;
  name: string;
}

interface IState {
  id: number;
  code: string;
  name: string;
}

interface ICity {
  id: number;
  code: string;
  name: string;
}

export interface IInvestorsDTOS {
  id: string;
  userId: string;
  user: IUserDTOS;
  description: string;
  cpf: number;
  rg: number;
  maritalStatus: number;
  genre: number;
  DDI: number;
  phone: number;
  cep: number;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  cityId: number;
  city: ICity;
  stateId: number;
  state: IState;
  countryId: number;
  country: ICountry;
  occupation: string;
  office: number;
  companyName: string;
  appear: boolean;
  politicallyExposed: boolean;
}