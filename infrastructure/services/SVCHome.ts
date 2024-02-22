import { con } from '@/application/entity/Routes'
import { IServiceResult } from '../interfaces/IServiceResult'
import { ServiceResult } from './ServiceResult'
import axios, { AxiosResponse } from 'axios'

export class SVCHome {
  public static async GetCountries(): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Home/GetAllCountries'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url)
      .then((res: AxiosResponse) => {
        if (res.data !== undefined) {
          sr.result = res.data
        }
      })
      .catch((err: any) => {
        sr.errorMessage = 'Service error'
        sr.errorDetails = err
      })

    return sr
  }

  public static async GetRegions(): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Home/GetAllRegions'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url)
      .then((res: AxiosResponse) => {
        if (res.data !== undefined) {
          sr.result = res.data
        }
      })
      .catch((err: any) => {
        sr.errorMessage = 'Service error'
        sr.errorDetails = err
      })

    return sr
  }

  public static async GetDistricts(): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Home/GetAllDistricts'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url)
      .then((res: AxiosResponse) => {
        if (res.data !== undefined) {
          sr.result = res.data
        }
      })
      .catch((err: any) => {
        sr.errorMessage = 'Service error'
        sr.errorDetails = err
      })

    return sr
  }

  public static async CreateUser(data: any): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Home/CreateUser'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data)
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

  public static async SignInUser(data: any): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'Home/SignIn'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data)
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
