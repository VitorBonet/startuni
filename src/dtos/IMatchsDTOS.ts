import { IStartupDTOS } from "./IStartupsDTOS";
import { IUserDTOS } from "./IUserDTOS";

export interface IMatchsDTOS {
  id: string;
  investorId: string;
  investor: IUserDTOS;
  startupId: string;
  startup: IStartupDTOS;
  investorPermission: boolean;
  startupPermission: boolean;
  startupPermissionAt: Date;
  createdAt: Date;
  updatedAt: Date;
}