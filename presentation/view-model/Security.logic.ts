import { CheckSecurity } from "@/application/interactors/Security";

export const CheckSecurityLogic = (CheckSecurityCallBack: any, data: any) => {
    return CheckSecurity(CheckSecurityCallBack, data);
}