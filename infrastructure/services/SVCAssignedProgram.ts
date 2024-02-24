import { con } from '@/application/entity/Routes'
import { IServiceResult } from '../interfaces/IServiceResult'
import { ServiceResult } from './ServiceResult'
import axios, { AxiosResponse } from 'axios'

export class SVCAssignedProgram {
  public static async GetAssignedPrograms(): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'AssignedProgram/GetAllAssignedPrograms'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async GetUsers(): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'AssignedProgram/GetAllUsers'
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  public static async CreateAssignedProgram(
    data: any
  ): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `AssignedProgram/CreateAssignedProgram`
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

  public static async UpdateAssignedProgram(
    data: any
  ): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + 'AssignedProgram/UpdateAssignedProgram'
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

  public static async DeleteAssignedProgram(
    data: any
  ): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string =
      _route + `AssignedProgram/DeleteAssignedProgram?Id=${data}`
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

  public static async GetMyAssignedPrograms(data: number): Promise<IServiceResult<any>> {
    let token: string = con.GetToken()
    let _route: string = con.ReturnRoute()
    const url: string = _route + `AssignedProgram/GetMyAssignedPrograms?UserId=${data}`
    let sr: ServiceResult<any> = new ServiceResult<any>()
    sr.errorMessage = 'Initializing'
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
}
