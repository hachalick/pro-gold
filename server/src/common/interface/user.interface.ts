import { PanelEnum, RolesEnum } from "../enum/role.enum";

export interface IUserModel extends Document {
    readonly name: string;
    readonly mobile: string;
    readonly password: string;
    readonly cash: string;
    readonly bills: Array<string>;
    readonly discountCode: Array<string>;
    readonly recentTransactions: Array<Object>;
    readonly province: string;
    readonly city: string;
    readonly birthData: string;
    readonly address: string;
    readonly role: RolesEnum;
    readonly panel: PanelEnum;
    readonly gender: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  }