import { IServiceResult } from '@/infrastructure/interfaces/IServiceResult'
import { SVCSettingsMaintenance } from '@/infrastructure/services/SVCSettingsMaintenance'

export const CreateCountry = (CreateCountryCallBack: any, data: any) => {
  /* Countries */

  SVCSettingsMaintenance.CreateCountry(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        CreateCountryCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        CreateCountryCallBack(true, 'error', data)
      }
    }
  )
}

export const UpdateCountry = (UpdateCountryCallBack: any, data: any) => {
  SVCSettingsMaintenance.UpdateCountry(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        UpdateCountryCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        UpdateCountryCallBack(true, 'error', data)
      }
    }
  )
}

export const DeleteCountry = (DeleteCountryCallBack: any, data: any) => {
  SVCSettingsMaintenance.DeleteCountry(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        DeleteCountryCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        DeleteCountryCallBack(true, 'error', data)
      }
    }
  )
}

/* Regions */

export const CreateRegion = (CreateRegionCallBack: any, data: any) => {
  SVCSettingsMaintenance.CreateRegion(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        CreateRegionCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        CreateRegionCallBack(true, 'error', data)
      }
    }
  )
}

export const UpdateRegion = (UpdateRegionCallBack: any, data: any) => {
  SVCSettingsMaintenance.UpdateRegion(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        UpdateRegionCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        UpdateRegionCallBack(true, 'error', data)
      }
    }
  )
}

export const DeleteRegion = (DeleteRegionCallBack: any, data: any) => {
  SVCSettingsMaintenance.DeleteRegion(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        DeleteRegionCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        DeleteRegionCallBack(true, 'error', data)
      }
    }
  )
}

/* Districts */

export const CreateDistrict = (CreateDistrictCallBack: any, data: any) => {
  SVCSettingsMaintenance.CreateDistrict(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        CreateDistrictCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        CreateDistrictCallBack(true, 'error', data)
      }
    }
  )
}

export const UpdateDistrict = (UpdateDistrictCallBack: any, data: any) => {
  SVCSettingsMaintenance.UpdateDistrict(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        UpdateDistrictCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        UpdateDistrictCallBack(true, 'error', data)
      }
    }
  )
}

export const DeleteDistrict = (UpdateDistrictCallBack: any, data: any) => {
  SVCSettingsMaintenance.DeleteDistrict(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        UpdateDistrictCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        UpdateDistrictCallBack(true, 'error', data)
      }
    }
  )
}

/* Programs */

export const GetPrograms = (GetProgramsCallBack: any) => {
  SVCSettingsMaintenance.GetPrograms().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetProgramsCallBack(false, '', data)
    } else {
      GetProgramsCallBack(true, 'error', [])
    }
  })
}

export const CreateProgram = (CreateProgramCallBack: any, data: any, optionType: string) => {
SVCSettingsMaintenance.CreateProgram(data, optionType).then(
  (res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res
      CreateProgramCallBack(false, '', data)
    } else {
      let data: any = res.errorDetails
      CreateProgramCallBack(true, 'error', data)
    }
  }
)
}

export const UpdateProgram = (UpdateProgramCallBack: any, data: any) => {
SVCSettingsMaintenance.UpdateProgram(data).then(
  (res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res
      UpdateProgramCallBack(false, '', data)
    } else {
      let data: any = res.errorDetails
      UpdateProgramCallBack(true, 'error', data)
    }
  }
)
}

export const DeleteProgram = (DeleteProgramCallBack: any, data: any) => {
SVCSettingsMaintenance.DeleteProgram(data).then(
  (res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res
      DeleteProgramCallBack(false, '', data)
    } else {
      let data: any = res.errorDetails
      DeleteProgramCallBack(true, 'error', data)
    }
  }
)
}
