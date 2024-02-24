import { con } from '@/application/entity/Routes'
import { IServiceResult } from '../interfaces/IServiceResult'
import { ServiceResult } from './ServiceResult'
import axios, { AxiosResponse } from 'axios'

export class SVCSettingsMaintenance {
  /* Countries */

  public static async CreateCountry(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/CreateCountry'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async UpdateCountry(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/UpdateCountry'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async DeleteCountry(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `SettingsMaintenance/DeleteCountry?Id=${data}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  /* Regions */

  public static async CreateRegion(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/CreateRegion'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async UpdateRegion(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/UpdateRegion'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async DeleteRegion(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `SettingsMaintenance/DeleteRegion?Id=${data}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  /* Districts */

  public static async CreateDistrict(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/CreateDistrict'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async UpdateDistrict(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/UpdateDistrict'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async DeleteDistrict(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `SettingsMaintenance/DeleteDistrict?Id=${data}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  /* Programs */
  
  public static async GetPrograms(): Promise<IServiceResult<any>> {
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/GetAllPrograms'
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

  public static async CreateProgram(data: any, optionType: string): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `SettingsMaintenance/CreateProgram?optionType=${optionType}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async UpdateProgram(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'SettingsMaintenance/UpdateProgram'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async DeleteProgram(data: any): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `SettingsMaintenance/DeleteProgram?Id=${data}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
