import { IServiceResult } from '@/infrastructure/interfaces/IServiceResult'
import { SVCSecurity } from '@/infrastructure/services/SVCSecurity'

export const CheckSecurity = (CheckSecurityCallBack: any, data: any) => {
    SVCSecurity.CheckSecurity(data).then((res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        CheckSecurityCallBack(false, '', data)
      } else {
          let data: any = res.errorDetails
          CheckSecurityCallBack(true, 'error', data)
      }
    })
  }
