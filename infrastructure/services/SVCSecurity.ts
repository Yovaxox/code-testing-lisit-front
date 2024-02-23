import { con } from '@/application/entity/Routes'
import { IServiceResult } from '../interfaces/IServiceResult'
import { ServiceResult } from './ServiceResult'
import axios, { AxiosResponse } from 'axios'

export class SVCSecurity {
  public static async CheckSecurity(token: any): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Security/ValidateToken'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, token, { headers: { 'Content-Type': 'application/json' } })
      .then((res: AxiosResponse) => {
        if (res.data !== undefined) {
          sr.result = res
        }
      })
      .catch((err: any) => {
        sr.errorMessage = 'Service error'
        sr.errorDetails = err
      })

    return sr
  }
}
