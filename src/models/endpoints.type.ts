import { Domain } from "@models/domain.type";

export type Endpoints = {
  [key in Domain]: {
    baseUrl: string;
    home: string;
    vacations: string;
    hotels: string;
    offer: string;
  };
};
