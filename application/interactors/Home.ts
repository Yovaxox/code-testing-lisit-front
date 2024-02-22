import { IServiceResult } from '@/infrastructure/interfaces/IServiceResult'
import { SVCHome } from '@/infrastructure/services/SVCHome'

export const GetCountries = (GetCountriesCallBack: any) => {
  SVCHome.GetCountries().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetCountriesCallBack(false, '', data)
    } else {
      GetCountriesCallBack(true, 'error', [])
    }
  })
}

export const GetRegions = (GetRegionsCallBack: any) => {
  SVCHome.GetRegions().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetRegionsCallBack(false, '', data)
    } else {
      GetRegionsCallBack(true, 'error', [])
    }
  })
}

export const GetDistricts = (GetDistrictsCallBack: any) => {
  SVCHome.GetDistricts().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetDistrictsCallBack(false, '', data)
    } else {
      GetDistrictsCallBack(true, 'error', [])
    }
  })
}

export const CreateUser = (CreateUserCallBack: any, data: any) => {
  SVCHome.CreateUser(data).then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res
      CreateUserCallBack(false, '', data)
    } else {
        let data: any = res.errorDetails
      CreateUserCallBack(true, 'error', data)
    }
  })
}

export const SignInUser = (SignInCallBack: any, data: any) => {
    SVCHome.SignInUser(data).then((res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        SignInCallBack(false, '', data)
      } else {
          let data: any = res.errorDetails
          SignInCallBack(true, 'error', data)
      }
    })
  }
